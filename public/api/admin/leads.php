<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$q      = ts_normalize_digits(trim((string)($_GET['q'] ?? '')));
$page   = max(1, (int)($_GET['page'] ?? 1));
$limit  = min(100, max(1, (int)($_GET['limit'] ?? 25)));
$offset = ($page - 1) * $limit;

$where  = '';
$params = [];
if ($q !== '') {
    $where = 'WHERE phone LIKE ?';
    $params[] = '%' . $q . '%';
}

try {
    $pdo = ts_db();
    $hasNote   = ts_column_exists($pdo, 'ts_leads', 'note');
    $hasStatus = ts_column_exists($pdo, 'ts_leads', 'status');

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM ts_leads $where");
    $stmt->execute($params);
    $total = (int)$stmt->fetchColumn();

    $cols = ['id', 'phone', 'first_seen', 'last_seen', 'search_count', 'ip'];
    if ($hasNote)   $cols[] = 'note';
    if ($hasStatus) $cols[] = 'status';
    $sql = "SELECT " . implode(', ', $cols) . " FROM ts_leads $where ORDER BY last_seen DESC LIMIT $limit OFFSET $offset";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
} catch (Throwable $e) {
    ts_json(500, ['error' => 'Query failed: ' . $e->getMessage()]);
}

if ($rows) {
    $ids   = array_column($rows, 'id');
    $place = implode(',', array_fill(0, count($ids), '?'));
    $stmt  = $pdo->prepare(
        "SELECT lead_id, query, created_at FROM ts_search_logs
         WHERE lead_id IN ($place)
         ORDER BY created_at DESC"
    );
    $stmt->execute($ids);
    $byLead = [];
    foreach ($stmt->fetchAll() as $r) {
        $byLead[$r['lead_id']][] = $r;
    }
    foreach ($rows as &$r) {
        $r['recent_queries'] = array_slice($byLead[$r['id']] ?? [], 0, 5);
    }
}

ts_json(200, ['items' => $rows, 'total' => $total, 'page' => $page, 'limit' => $limit]);
