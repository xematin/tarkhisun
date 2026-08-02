<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$admin = ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$first = trim((string)($body['first_name'] ?? ''));
$last  = trim((string)($body['last_name'] ?? ''));
$user  = trim((string)($body['username'] ?? ''));
$pass  = (string)($body['password'] ?? '');

if ($first === '' || $last === '') ts_json_error(400, 'Missing name');
if (!preg_match('/^[A-Za-z0-9_.\-]{3,64}$/', $user)) ts_json_error(400, 'Invalid username');
if (strlen($pass) < 6) ts_json_error(400, 'Password too short');

$pdo = ts_db();
$stmt = $pdo->prepare('SELECT id FROM ts_card_users WHERE username = ? LIMIT 1');
$stmt->execute([$user]);
if ($stmt->fetch()) ts_json_error(409, 'Username already exists');

if (!ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval')) {
    try { $pdo->exec("ALTER TABLE ts_card_users ADD COLUMN require_payment_approval TINYINT(1) NOT NULL DEFAULT 0"); } catch (Throwable $e) {}
}
$hasFlag = ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval');
$flag = (int)($body['require_payment_approval'] ?? 0) === 1 ? 1 : 0;

$hash = password_hash($pass, PASSWORD_BCRYPT);
if ($hasFlag) {
    $stmt = $pdo->prepare('INSERT INTO ts_card_users (first_name, last_name, username, password_hash, require_payment_approval, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$first, $last, $user, $hash, $flag, (int)$admin['id'], date('Y-m-d H:i:s')]);
} else {
    $stmt = $pdo->prepare('INSERT INTO ts_card_users (first_name, last_name, username, password_hash, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$first, $last, $user, $hash, (int)$admin['id'], date('Y-m-d H:i:s')]);
}
$id = (int)$pdo->lastInsertId();

ts_json(200, ['ok' => true, 'id' => $id, 'first_name' => $first, 'last_name' => $last, 'username' => $user, 'require_payment_approval' => $flag]);
