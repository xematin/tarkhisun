<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$code = preg_replace('/\D+/', '', ts_normalize_digits((string)($body['code'] ?? '')));
$name = trim((string)($body['name'] ?? ''));

if (!preg_match('/^\d{5}$/', $code)) ts_json_error(400, 'کد گمرکی باید دقیقاً ۵ رقم باشد');
if ($name === '') ts_json_error(400, 'نام گمرک الزامی است');

$pdo = ts_db();
$ex = $pdo->prepare("SELECT code FROM ts_customs_codes WHERE code=? LIMIT 1");
$ex->execute([$code]);
if ($ex->fetch()) ts_json_error(409, 'این کد قبلاً ثبت شده است');

$pdo->prepare("INSERT INTO ts_customs_codes (code, name) VALUES (?, ?)")->execute([$code, $name]);
ts_json(200, ['ok' => true]);
