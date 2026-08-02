<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$id    = (int)($body['id'] ?? 0);
$first = trim((string)($body['first_name'] ?? ''));
$last  = trim((string)($body['last_name'] ?? ''));
$user  = trim((string)($body['username'] ?? ''));
$pass  = (string)($body['password'] ?? '');

if ($id <= 0) ts_json_error(400, 'شناسه نامعتبر');
if ($first === '' || $last === '') ts_json_error(400, 'نام و نام خانوادگی الزامی است');
if (!preg_match('/^[A-Za-z0-9_.\-]{3,64}$/', $user)) ts_json_error(400, 'نام کاربری نامعتبر');

$pdo = ts_db();
$st = $pdo->prepare('SELECT id FROM ts_card_users WHERE id=? LIMIT 1');
$st->execute([$id]);
if (!$st->fetch()) ts_json_error(404, 'کاربر یافت نشد');

// uniqueness
$st = $pdo->prepare('SELECT id FROM ts_card_users WHERE username=? AND id<>? LIMIT 1');
$st->execute([$user, $id]);
if ($st->fetch()) ts_json_error(409, 'این نام کاربری قبلاً استفاده شده');

if (!ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval')) {
    try { $pdo->exec("ALTER TABLE ts_card_users ADD COLUMN require_payment_approval TINYINT(1) NOT NULL DEFAULT 0"); } catch (Throwable $e) {}
}
$hasFlag = ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval');

$sets = ['first_name=?', 'last_name=?', 'username=?'];
$params = [$first, $last, $user];

if ($hasFlag && array_key_exists('require_payment_approval', $body)) {
    $sets[] = 'require_payment_approval=?';
    $params[] = (int)$body['require_payment_approval'] === 1 ? 1 : 0;
}

if ($pass !== '') {
    if (strlen($pass) < 6) ts_json_error(400, 'رمز عبور باید حداقل ۶ کاراکتر باشد');
    $sets[] = 'password_hash=?';
    $params[] = password_hash($pass, PASSWORD_BCRYPT);
}

$params[] = $id;
$pdo->prepare('UPDATE ts_card_users SET ' . implode(',', $sets) . ' WHERE id=?')->execute($params);

ts_json(200, ['ok' => true]);
