<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body   = ts_read_json_body();
$id     = (int)($body['id'] ?? 0);
$status = isset($body['status']) ? trim((string)$body['status']) : null;
$note   = isset($body['note'])   ? mb_substr(trim((string)$body['note']), 0, 500) : null;

if ($id <= 0) ts_json_error(400, 'Missing id');
if ($status !== null && !in_array($status, ['new','contacted','done','rejected'], true)) {
    ts_json_error(400, 'Invalid status');
}

$sets = [];
$params = [];
if ($status !== null) { $sets[] = 'status = ?'; $params[] = $status; }
if ($note   !== null) { $sets[] = 'note = ?';   $params[] = $note; }
if (!$sets) ts_json_error(400, 'Nothing to update');

$params[] = $id;

$stmt = ts_db()->prepare('UPDATE ts_leads SET ' . implode(', ', $sets) . ' WHERE id = ?');
$stmt->execute($params);

ts_json(200, ['ok' => true]);
