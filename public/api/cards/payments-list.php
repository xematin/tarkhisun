<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

$card_id = isset($_GET['card_id']) ? (int)$_GET['card_id'] : 0;

$pdo = ts_db();
$hasPayG = ts_column_exists($pdo, 'ts_card_payments', 'pay_date_gregorian');
$hasPayJ = ts_column_exists($pdo, 'ts_card_payments', 'pay_date_jalali');
$payGCol = $hasPayG ? 'pay_date_gregorian' : 'NULL AS pay_date_gregorian';
$payJCol = $hasPayJ ? 'pay_date_jalali'    : 'NULL AS pay_date_jalali';
$sql = "SELECT id, card_id, amount_irt, receipt_path, note, $payGCol, $payJCol, status, created_at
        FROM ts_card_payments
        WHERE card_user_id = ?";
$params = [(int)$u['id']];
if ($card_id > 0) { $sql .= " AND card_id = ?"; $params[] = $card_id; }
$sql .= " ORDER BY id DESC";

$st = $pdo->prepare($sql);
$st->execute($params);
$rows = $st->fetchAll();
foreach ($rows as &$r) {
    $r['id'] = (int)$r['id'];
    $r['card_id'] = (int)$r['card_id'];
    $r['amount_irt'] = (float)$r['amount_irt'];
}
ts_json(200, ['items' => $rows]);
