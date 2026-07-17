<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$name = trim((string)($body['name'] ?? ''));
if ($name === '' || mb_strlen($name) > 150) ts_json_error(400, 'نام دسته معتبر نیست');

$pdo = ts_db();
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS ts_section_categories (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL UNIQUE,
        sort_order INT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) DEFAULT CHARSET=utf8mb4");
} catch (Throwable $e) {}

$ex = $pdo->prepare("SELECT id FROM ts_section_categories WHERE name=? LIMIT 1");
$ex->execute([$name]);
if ($ex->fetch()) ts_json_error(409, 'این دسته قبلاً ثبت شده است');

$so = (int)$pdo->query("SELECT COALESCE(MAX(sort_order),0)+1 FROM ts_section_categories")->fetchColumn();
$pdo->prepare("INSERT INTO ts_section_categories (name, sort_order) VALUES (?, ?)")->execute([$name, $so]);
ts_json(200, ['ok' => true, 'id' => (int)$pdo->lastInsertId()]);
