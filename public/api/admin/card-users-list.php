<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();
if (!ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval')) {
    try { $pdo->exec("ALTER TABLE ts_card_users ADD COLUMN require_payment_approval TINYINT(1) NOT NULL DEFAULT 0"); } catch (Throwable $e) {}
}
$hasFlag = ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval');

$cols = 'id, first_name, last_name, username, created_at' . ($hasFlag ? ', require_payment_approval' : '');
$rows = $pdo->query("SELECT $cols FROM ts_card_users ORDER BY id DESC")->fetchAll();
foreach ($rows as &$r) {
    $r['require_payment_approval'] = isset($r['require_payment_approval']) ? (int)$r['require_payment_approval'] : 0;
}
unset($r);

ts_json(200, ['items' => $rows]);
