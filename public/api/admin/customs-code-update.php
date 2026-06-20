<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$code = preg_replace('/\D+/', '', ts_normalize_digits((string)($body['code'] ?? '')));
$name = trim((string)($body['name'] ?? ''));

if (!preg_match('/^\d{5}$/', $code)) ts_json_error(400, 'کد گمرکی نامعتبر');
if ($name === '') ts_json_error(400, 'نام گمرک الزامی است');

$pdo = ts_db();
$st = $pdo->prepare("UPDATE ts_customs_codes SET name=? WHERE code=?");
$st->execute([$name, $code]);
if ($st->rowCount() === 0) {
    // Either no change or not found — verify existence
    $chk = $pdo->prepare("SELECT code FROM ts_customs_codes WHERE code=? LIMIT 1");
    $chk->execute([$code]);
    if (!$chk->fetch()) ts_json_error(404, 'کد یافت نشد');
}
ts_json(200, ['ok' => true]);
