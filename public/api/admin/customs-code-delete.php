<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$code = preg_replace('/\D+/', '', ts_normalize_digits((string)($body['code'] ?? '')));
if (!preg_match('/^\d{5}$/', $code)) ts_json_error(400, 'کد گمرکی نامعتبر');

ts_db()->prepare("DELETE FROM ts_customs_codes WHERE code=?")->execute([$code]);
ts_json(200, ['ok' => true]);
