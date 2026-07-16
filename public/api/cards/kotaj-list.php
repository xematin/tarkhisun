<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

$card_id = isset($_GET['card_id']) ? (int)$_GET['card_id'] : 0;

$pdo = ts_db();
// Detect if gregorian column exists
$hasG = false;
try { $pdo->query("SELECT kotaj_date_gregorian FROM ts_kotaj LIMIT 0"); $hasG = true; } catch (Throwable $e) {}

$cols = $hasG ? "k.*, e.title AS entry_title" : "k.*, e.title AS entry_title";
$sql = "SELECT $cols
        FROM ts_kotaj k
        LEFT JOIN ts_card_entries e ON e.id = k.entry_id
        WHERE k.card_user_id = ?";
$params = [(int)$u['id']];
if ($card_id > 0) { $sql .= " AND k.card_id = ?"; $params[] = $card_id; }
$sql .= " ORDER BY k.id DESC";

$st = $pdo->prepare($sql);
$st->execute($params);
$rows = $st->fetchAll();

$ids = array_map(fn($r) => (int)$r['id'], $rows);
$itemsByK = [];
if ($ids) {
    $place = implode(',', array_fill(0, count($ids), '?'));
    $it = $pdo->prepare("SELECT * FROM ts_kotaj_items WHERE kotaj_id IN ($place) ORDER BY id");
    $it->execute($ids);
    foreach ($it->fetchAll() as $r) {
        $v = (float)$r['value_usd']; $p = (float)$r['unit_price_irt'];
        $itemsByK[(int)$r['kotaj_id']][] = [
            'name' => $r['name'],
            'value_usd' => $v,
            'unit_price_irt' => $p,
            'toman' => $v * $p,
        ];
    }
}

$out = [];
foreach ($rows as $r) {
    $kid = (int)$r['id'];
    $its = $itemsByK[$kid] ?? [];
    $tomanTotal = 0.0;
    foreach ($its as $x) $tomanTotal += (float)$x['toman'];
    $atts = [];
    if (!empty($r['attachments'])) {
        $d = json_decode((string)$r['attachments'], true);
        if (is_array($d)) $atts = array_values(array_filter(array_map('strval', $d)));
    }
    $out[] = [
        'id' => $kid,
        'card_id' => (int)$r['card_id'],
        'entry_id' => (int)$r['entry_id'],
        'entry_title' => $r['entry_title'],
        'kotaj_number' => $r['kotaj_number'],
        'kotaj_date_jalali' => $r['kotaj_date_jalali'],
        'kotaj_date_gregorian' => $r['kotaj_date_gregorian'] ?? null,
        'total_value_usd' => (float)$r['total_value_usd'],
        'toman_total' => $tomanTotal,
        'attachments' => $atts,
        'created_at' => $r['created_at'],
        'items' => $its,
    ];
}
ts_json(200, ['items' => $out]);
