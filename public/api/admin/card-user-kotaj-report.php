<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$uid = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
if ($uid <= 0) ts_json_error(400, 'user_id نامعتبر');

$pdo = ts_db();

$st = $pdo->prepare('SELECT id, first_name, last_name, username FROM ts_card_users WHERE id=? LIMIT 1');
$st->execute([$uid]);
$user = $st->fetch();
if (!$user) ts_json_error(404, 'کاربر یافت نشد');

$hasG = false;
try { $pdo->query("SELECT kotaj_date_gregorian FROM ts_kotaj LIMIT 0"); $hasG = true; } catch (Throwable $e) {}
$hasAtt = false;
try { $pdo->query("SELECT attachments FROM ts_kotaj LIMIT 0"); $hasAtt = true; } catch (Throwable $e) {}
$gSel = $hasG ? "k.kotaj_date_gregorian," : "";
$aSel = $hasAtt ? "k.attachments," : "";

$rows = $pdo->prepare(
    "SELECT k.id, k.card_id, k.entry_id, k.kotaj_number, k.kotaj_date_jalali, $gSel $aSel
            k.total_value_usd, k.created_at,
            c.name AS card_name, e.title AS entry_title
     FROM ts_kotaj k
     JOIN ts_cards c ON c.id=k.card_id
     LEFT JOIN ts_card_entries e ON e.id=k.entry_id
     WHERE k.card_user_id=?
     ORDER BY k.id DESC"
);
$rows->execute([$uid]);
$rows = $rows->fetchAll();

$ids = array_map(fn($r) => (int)$r['id'], $rows);
$tomanByK = [];
$itemsByK = [];
if ($ids) {
    $place = implode(',', array_fill(0, count($ids), '?'));
    $it = $pdo->prepare("SELECT * FROM ts_kotaj_items WHERE kotaj_id IN ($place) ORDER BY id");
    $it->execute($ids);
    foreach ($it->fetchAll() as $r) {
        $kid = (int)$r['kotaj_id'];
        $v = (float)$r['value_usd']; $p = (float)$r['unit_price_irt']; $t = $v * $p;
        $itemsByK[$kid][] = [
            'name' => $r['name'],
            'value_usd' => $v,
            'unit_price_irt' => $p,
            'toman' => $t,
        ];
        $tomanByK[$kid] = ($tomanByK[$kid] ?? 0) + $t;
    }
}

$totalUsd = 0.0; $totalToman = 0.0;
$out = [];
foreach ($rows as $r) {
    $kid = (int)$r['id'];
    $kt = $tomanByK[$kid] ?? 0.0;
    $atts = [];
    if (!empty($r['attachments'])) {
        $d = json_decode((string)$r['attachments'], true);
        if (is_array($d)) $atts = array_values(array_filter(array_map('strval', $d)));
    }
    $out[] = [
        'id' => $kid,
        'card_id' => (int)$r['card_id'],
        'card_name' => $r['card_name'],
        'entry_id' => (int)$r['entry_id'],
        'entry_title' => $r['entry_title'],
        'kotaj_number' => $r['kotaj_number'],
        'kotaj_date_jalali' => $r['kotaj_date_jalali'],
        'kotaj_date_gregorian' => $r['kotaj_date_gregorian'] ?? null,
        'total_value_usd' => (float)$r['total_value_usd'],
        'toman_total' => $kt,
        'created_at' => $r['created_at'],
        'attachments' => $atts,
        'items' => $itemsByK[$kid] ?? [],
    ];
    $totalUsd += (float)$r['total_value_usd'];
    $totalToman += $kt;
}

ts_json(200, [
    'user' => $user,
    'items' => $out,
    'totals' => [
        'count' => count($out),
        'usd' => $totalUsd,
        'toman' => $totalToman,
    ],
]);
