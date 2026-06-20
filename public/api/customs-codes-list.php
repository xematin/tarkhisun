<?php
declare(strict_types=1);
require __DIR__ . '/db.php';
ts_cors_same_origin();

$pdo = ts_db();
try {
    $rows = $pdo->query("SELECT code, name FROM ts_customs_codes ORDER BY code ASC")->fetchAll();
} catch (Throwable $e) {
    ts_json(200, ['items' => []]);
}
ts_json(200, ['items' => $rows]);
