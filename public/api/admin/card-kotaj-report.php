<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$card_id = isset($_GET['card_id']) ? (int)$_GET['card_id'] : 0;
if ($card_id <= 0) ts_json_error(400, 'card_id نامعتبر');

$pdo = ts_db();
$hasG = false;
try { $pdo->query("SELECT kotaj_date_gregorian FROM ts_kotaj LIMIT 0"); $hasG = true; } catch (Throwable $e) {}
$st = $pdo->prepare(
    "SELECT k.*, e.title AS entry_title, e.unit_price_irt AS entry_unit_price_irt,
            u.first_name, u.last_name, u.username
     FROM ts_kotaj k
     LEFT JOIN ts_card_entries e ON e.id = k.entry_id
     JOIN ts_card_users u ON u.id = k.card_user_id
     WHERE k.card_id = ?
     ORDER BY k.card_user_id, k.id DESC"
);
$st->execute([$card_id]);
$rows = $st->fetchAll();

$entryPriceByK = [];
foreach ($rows as $r) {
    $entryPriceByK[(int)$r['id']] = $r['entry_unit_price_irt'] !== null ? (float)$r['entry_unit_price_irt'] : null;
}

$ids = array_map(fn($r) => (int)$r['id'], $rows);
$itemsByK = [];
$tomanByK = [];
if ($ids) {
    $place = implode(',', array_fill(0, count($ids), '?'));
    $it = $pdo->prepare("SELECT * FROM ts_kotaj_items WHERE kotaj_id IN ($place) ORDER BY id");
    $it->execute($ids);
    foreach ($it->fetchAll() as $r) {
        $kid = (int)$r['kotaj_id'];
        $v = (float)$r['value_usd'];
        // Override per-item user price with the card section's defined price
        $p = $entryPriceByK[$kid] ?? (float)$r['unit_price_irt'];
        $t = $v * $p;
        $itemsByK[$kid][] = [
            'name' => $r['name'],
            'value_usd' => $v,
            'unit_price_irt' => $p,
            'toman' => $t,
        ];
        $tomanByK[$kid] = ($tomanByK[$kid] ?? 0) + $t;
    }
}

// Payments per user for this card
$payByUser = [];
try {
    $ps = $pdo->prepare(
        "SELECT card_user_id, COALESCE(SUM(amount_irt),0) AS s
         FROM ts_card_payments WHERE card_id=? AND status='confirmed'
         GROUP BY card_user_id"
    );
    $ps->execute([$card_id]);
    foreach ($ps->fetchAll() as $r) $payByUser[(int)$r['card_user_id']] = (float)$r['s'];
} catch (Throwable $e) {}

$users = [];
foreach ($rows as $r) {
    $uid = (int)$r['card_user_id'];
    if (!isset($users[$uid])) {
        $users[$uid] = [
            'id' => $uid,
            'first_name' => $r['first_name'],
            'last_name' => $r['last_name'],
            'username' => $r['username'],
            'total_usd' => 0.0,
            'total_toman' => 0.0,
            'payments_toman' => $payByUser[$uid] ?? 0.0,
            'kotajs' => [],
        ];
    }
    $kid = (int)$r['id'];
    $kt = $tomanByK[$kid] ?? 0.0;
    $atts = [];
    if (!empty($r['attachments'])) {
        $d = json_decode((string)$r['attachments'], true);
        if (is_array($d)) $atts = array_values(array_filter(array_map('strval', $d)));
    }
    $users[$uid]['kotajs'][] = [
        'id' => $kid,
        'entry_id' => (int)$r['entry_id'],
        'entry_title' => $r['entry_title'],
        'kotaj_number' => $r['kotaj_number'],
        'kotaj_date_jalali' => $r['kotaj_date_jalali'],
        'kotaj_date_gregorian' => $r['kotaj_date_gregorian'] ?? null,
        'total_value_usd' => (float)$r['total_value_usd'],
        'toman_total' => $kt,
        'created_at' => $r['created_at'],
        'items' => $itemsByK[$kid] ?? [],
    ];
    $users[$uid]['total_usd'] += (float)$r['total_value_usd'];
    $users[$uid]['total_toman'] += $kt;
}

foreach ($users as &$uu) {
    $uu['debt_toman'] = max(0, $uu['total_toman'] - $uu['payments_toman']);
}
unset($uu);

ts_json(200, ['users' => array_values($users)]);
