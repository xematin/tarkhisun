<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$q       = trim((string)($_GET['q'] ?? ''));
$cardId  = isset($_GET['card_id']) ? (int)$_GET['card_id'] : 0;
$userId  = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
$from    = trim((string)($_GET['from'] ?? ''));
$to      = trim((string)($_GET['to'] ?? ''));
$page    = max(1, (int)($_GET['page'] ?? 1));
$pageSz  = min(200, max(10, (int)($_GET['page_size'] ?? 50)));

$pdo = ts_db();

// detect kotaj_date_gregorian
$hasG = false;
try { $pdo->query('SELECT kotaj_date_gregorian FROM ts_kotaj LIMIT 0'); $hasG = true; } catch (Throwable $e) {}

$where = []; $params = [];
if ($q !== '')      { $where[] = 'i.name LIKE ?'; $params[] = '%' . $q . '%'; }
if ($cardId > 0)    { $where[] = 'k.card_id = ?'; $params[] = $cardId; }
if ($userId > 0)    { $where[] = 'k.card_user_id = ?'; $params[] = $userId; }
if ($hasG && $from !== '') { $where[] = 'k.kotaj_date_gregorian >= ?'; $params[] = $from; }
if ($hasG && $to   !== '') { $where[] = 'k.kotaj_date_gregorian <= ?'; $params[] = $to; }

$whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

// totals
$totSql = "SELECT COUNT(*) AS n,
                  COALESCE(SUM(i.value_usd),0) AS usd,
                  COALESCE(SUM(i.value_usd * i.unit_price_irt),0) AS toman
           FROM ts_kotaj_items i
           JOIN ts_kotaj k ON k.id = i.kotaj_id
           $whereSql";
$ts = $pdo->prepare($totSql);
$ts->execute($params);
$tot = $ts->fetch();

// page
$offset = ($page - 1) * $pageSz;
$gSel   = $hasG ? 'k.kotaj_date_gregorian,' : 'NULL AS kotaj_date_gregorian,';
$hasAttach = ts_column_exists($pdo, 'ts_kotaj', 'attachments');
$attachSel = $hasAttach ? 'k.attachments,' : 'NULL AS attachments,';
$sql = "SELECT i.id, i.kotaj_id, i.name, i.value_usd, i.unit_price_irt,
               k.kotaj_number, k.kotaj_date_jalali, $gSel $attachSel
               k.card_id, k.card_user_id, k.entry_id,
               c.name AS card_name,
               u.first_name, u.last_name, u.username,
               e.title AS entry_title
        FROM ts_kotaj_items i
        JOIN ts_kotaj k ON k.id = i.kotaj_id
        JOIN ts_cards c ON c.id = k.card_id
        JOIN ts_card_users u ON u.id = k.card_user_id
        LEFT JOIN ts_card_entries e ON e.id = k.entry_id
        $whereSql
        ORDER BY i.id DESC
        LIMIT $pageSz OFFSET $offset";
$st = $pdo->prepare($sql);
$st->execute($params);
$rows = $st->fetchAll();

foreach ($rows as &$r) {
    $r['id'] = (int)$r['id'];
    $r['kotaj_id'] = (int)$r['kotaj_id'];
    $r['card_id'] = (int)$r['card_id'];
    $r['card_user_id'] = (int)$r['card_user_id'];
    $r['value_usd'] = (float)$r['value_usd'];
    $r['unit_price_irt'] = (float)$r['unit_price_irt'];
    $r['toman'] = round($r['value_usd'] * $r['unit_price_irt'], 2);
    $r['user_name'] = trim(($r['first_name'] ?? '') . ' ' . ($r['last_name'] ?? ''));
}
unset($r);

ts_json(200, [
    'items' => $rows,
    'totals' => [
        'count' => (int)$tot['n'],
        'usd'   => (float)$tot['usd'],
        'toman' => (float)$tot['toman'],
    ],
    'page' => $page,
    'page_size' => $pageSz,
]);
