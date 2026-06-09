<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$q       = ts_normalize_digits(trim((string)($_GET['q'] ?? '')));
$status  = trim((string)($_GET['status'] ?? ''));
$page    = max(1, (int)($_GET['page'] ?? 1));
$limit   = min(100, max(1, (int)($_GET['limit'] ?? 25)));
$offset  = ($page - 1) * $limit;

$wheres = [];
$params = [];
if ($q !== '') {
    $wheres[] = 'phone LIKE ?';
    $params[] = '%' . $q . '%';
}
if (in_array($status, ['new','contacted','done','rejected'], true)) {
    $wheres[] = 'status = ?';
    $params[] = $status;
}
$where = $wheres ? ('WHERE ' . implode(' AND ', $wheres)) : '';

$pdo  = ts_db();
$stmt = $pdo->prepare("SELECT COUNT(*) FROM ts_card_consult $where");
$stmt->execute($params);
$total = (int)$stmt->fetchColumn();

$sql = "SELECT id, phone, source, ip, note, status, created_at, updated_at
        FROM ts_card_consult $where
        ORDER BY created_at DESC
        LIMIT $limit OFFSET $offset";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

ts_json(200, ['items' => $rows, 'total' => $total, 'page' => $page, 'limit' => $limit]);
