<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_admin_require();

$pdo = ts_db();
ts_backup_ensure_schema($pdo);

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) ts_json_error(400, 'id نامعتبر است');

$st = $pdo->prepare('SELECT * FROM ts_backups WHERE id = ? LIMIT 1');
$st->execute([$id]);
$row = $st->fetch();
if (!$row) ts_json_error(404, 'بک‌آپ یافت نشد');

$name = basename((string)$row['filename']);
if (!preg_match('/^[A-Za-z0-9._-]+$/', $name)) ts_json_error(400, 'نام فایل نامعتبر است');

$path = ts_backup_dir() . '/' . $name;
if (!file_exists($path)) ts_json_error(404, 'فایل روی سرور موجود نیست');

header('Content-Type: application/sql; charset=utf-8');
header("Content-Disposition: attachment; filename=\"$name\"");
header('Content-Length: ' . (string)filesize($path));
readfile($path);
exit;
