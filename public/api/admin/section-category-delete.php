<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$id = (int)($body['id'] ?? 0);
if ($id <= 0) ts_json_error(400, 'شناسه نامعتبر');

$pdo = ts_db();
$pdo->prepare("DELETE FROM ts_section_categories WHERE id=?")->execute([$id]);
ts_json(200, ['ok' => true]);
