<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$id = (int)($body['id'] ?? 0);
$name = trim((string)($body['name'] ?? ''));
if ($id <= 0) ts_json_error(400, 'شناسه نامعتبر');
if ($name === '' || mb_strlen($name) > 150) ts_json_error(400, 'نام دسته معتبر نیست');

$pdo = ts_db();
$dup = $pdo->prepare("SELECT id FROM ts_section_categories WHERE name=? AND id<>? LIMIT 1");
$dup->execute([$name, $id]);
if ($dup->fetch()) ts_json_error(409, 'دسته‌ای با این نام قبلاً وجود دارد');

$st = $pdo->prepare("UPDATE ts_section_categories SET name=? WHERE id=?");
$st->execute([$name, $id]);
ts_json(200, ['ok' => true]);
