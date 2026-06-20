<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();

// Per-user kotaj totals
$kotajByUser = [];
foreach ($pdo->query(
    "SELECT card_user_id, COUNT(*) AS n, COALESCE(SUM(total_value_usd),0) AS usd
     FROM ts_kotaj GROUP BY card_user_id"
)->fetchAll() as $r) {
    $kotajByUser[(int)$r['card_user_id']] = [
        'count' => (int)$r['n'],
        'usd'   => (float)$r['usd'],
    ];
}

// Per-user toman debt (sum of items)
$debtByUser = [];
foreach ($pdo->query(
    "SELECT k.card_user_id, COALESCE(SUM(ki.value_usd * ki.unit_price_irt),0) AS toman
     FROM ts_kotaj k
     JOIN ts_kotaj_items ki ON ki.kotaj_id = k.id
     GROUP BY k.card_user_id"
)->fetchAll() as $r) {
    $debtByUser[(int)$r['card_user_id']] = (float)$r['toman'];
}

// Per-user confirmed payments
$paidByUser = [];
try {
    foreach ($pdo->query(
        "SELECT card_user_id, COALESCE(SUM(amount_irt),0) AS s
         FROM ts_card_payments WHERE status='confirmed'
         GROUP BY card_user_id"
    )->fetchAll() as $r) {
        $paidByUser[(int)$r['card_user_id']] = (float)$r['s'];
    }
} catch (Throwable $e) { $paidByUser = []; }

// Per-user active card count
$cardCountByUser = [];
foreach ($pdo->query(
    "SELECT card_user_id, COUNT(DISTINCT card_id) AS n
     FROM ts_card_user_access GROUP BY card_user_id"
)->fetchAll() as $r) {
    $cardCountByUser[(int)$r['card_user_id']] = (int)$r['n'];
}

$users = $pdo->query(
    "SELECT id, first_name, last_name, username FROM ts_card_users ORDER BY id DESC"
)->fetchAll();

$rows = [];
$totDebt = 0.0; $totPaid = 0.0; $totRem = 0.0; $activeUsers = 0;
foreach ($users as $u) {
    $uid = (int)$u['id'];
    $k = $kotajByUser[$uid] ?? ['count' => 0, 'usd' => 0.0];
    $debt = $debtByUser[$uid] ?? 0.0;
    $paid = $paidByUser[$uid] ?? 0.0;
    $cards = $cardCountByUser[$uid] ?? 0;
    if ($k['count'] === 0 && $paid == 0.0 && $cards === 0) continue;
    $rem = $debt - $paid; // positive => user owes us
    $rows[] = [
        'id' => $uid,
        'first_name' => $u['first_name'],
        'last_name' => $u['last_name'],
        'username' => $u['username'],
        'kotaj_count' => $k['count'],
        'used_usd' => $k['usd'],
        'debt_irt' => $debt,
        'paid_irt' => $paid,
        'remaining_irt' => $rem,
        'card_count' => $cards,
    ];
    $totDebt += $debt; $totPaid += $paid; $totRem += $rem;
    if ($k['count'] > 0 || $paid > 0) $activeUsers++;
}

// sort by remaining desc (largest debtors first)
usort($rows, fn($a, $b) => $b['remaining_irt'] <=> $a['remaining_irt']);

ts_json(200, [
    'totals' => [
        'users' => $activeUsers,
        'debt_irt' => $totDebt,
        'paid_irt' => $totPaid,
        'remaining_irt' => $totRem,
    ],
    'users' => $rows,
]);
