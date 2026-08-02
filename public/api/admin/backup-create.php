<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

@set_time_limit(300);
@ini_set('memory_limit', '512M');

$row = ts_backup_store(ts_db(), 'manual');
ts_json(200, ['ok' => true, 'item' => $row]);
