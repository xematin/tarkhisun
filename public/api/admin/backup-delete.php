<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$id   = (int)($body['id'] ?? 0);
if ($id <= 0) ts_json_error(400, 'id نامعتبر است');

$pdo = ts_db();
ts_backup_ensure_schema($pdo);

$st = $pdo->prepare('SELECT filename FROM ts_backups WHERE id = ? LIMIT 1');
$st->execute([$id]);
$name = $st->fetchColumn();
if ($name === false) ts_json_error(404, 'بک‌آپ یافت نشد');

$base = basename((string)$name);
if (preg_match('/^[A-Za-z0-9._-]+$/', $base)) {
    @unlink(ts_backup_dir() . '/' . $base);
}
$pdo->prepare('DELETE FROM ts_backups WHERE id = ?')->execute([$id]);

ts_json(200, ['ok' => true]);
