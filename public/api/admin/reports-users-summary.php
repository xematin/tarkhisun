<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();

// ===== Per-user kotaj aggregates: count, usd, sell (toman), buy (toman) =====
// Buy price per dollar = ts_cards.cost_unit_price_irt (the value set when the card was created)
$aggByUser = [];
$rowsAgg = $pdo->query(
    "SELECT k.card_user_id,
            COUNT(DISTINCT k.id) AS n,
            COALESCE(SUM(k.total_value_usd),0) AS usd,
            COALESCE(SUM(ki.value_usd * ki.unit_price_irt),0) AS sell_irt,
            COALESCE(SUM(ki.value_usd * COALESCE(c.cost_unit_price_irt,0)),0) AS buy_irt
       FROM ts_kotaj k
       LEFT JOIN ts_kotaj_items ki ON ki.kotaj_id = k.id
       LEFT JOIN ts_cards c ON c.id = k.card_id
      GROUP BY k.card_user_id"
)->fetchAll();
foreach ($rowsAgg as $r) {
    $aggByUser[(int)$r['card_user_id']] = [
        'count'    => (int)$r['n'],
        'usd'      => (float)$r['usd'],
        'sell_irt' => (float)$r['sell_irt'],
        'buy_irt'  => (float)$r['buy_irt'],
    ];
}

// ===== Per-user list of kotaj (for expandable detail) =====
$kotajListByUser = [];
$detailRows = $pdo->query(
    "SELECT k.id, k.card_user_id, k.kotaj_number, k.kotaj_date_jalali, k.total_value_usd,
            COALESCE(SUM(ki.value_usd * ki.unit_price_irt),0) AS sell_irt,
            COALESCE(SUM(ki.value_usd * COALESCE(c.cost_unit_price_irt,0)),0) AS buy_irt
       FROM ts_kotaj k
       LEFT JOIN ts_kotaj_items ki ON ki.kotaj_id = k.id
       LEFT JOIN ts_cards c ON c.id = k.card_id
      GROUP BY k.id
      ORDER BY k.id DESC"
)->fetchAll();
foreach ($detailRows as $r) {
    $uid = (int)$r['card_user_id'];
    $sell = (float)$r['sell_irt'];
    $buy = (float)$r['buy_irt'];
    $kotajListByUser[$uid][] = [
        'id'         => (int)$r['id'],
        'number'     => $r['kotaj_number'],
        'date'       => $r['kotaj_date_jalali'],
        'value_usd'  => (float)$r['total_value_usd'],
        'sell_irt'   => $sell,
        'buy_irt'    => $buy,
        'profit_irt' => $sell - $buy,
    ];
}

// ===== Per-user confirmed payments =====
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

// ===== Per-user active card count =====
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
$totDebt = 0.0; $totPaid = 0.0; $totRem = 0.0;
$totSell = 0.0; $totBuy = 0.0; $totProfit = 0.0; $totUsd = 0.0;
$activeUsers = 0;
foreach ($users as $u) {
    $uid = (int)$u['id'];
    $a = $aggByUser[$uid] ?? ['count'=>0,'usd'=>0.0,'sell_irt'=>0.0,'buy_irt'=>0.0];
    $paid = $paidByUser[$uid] ?? 0.0;
    $cards = $cardCountByUser[$uid] ?? 0;
    if ($a['count'] === 0 && $paid == 0.0 && $cards === 0) continue;
    $sell = $a['sell_irt'];
    $buy = $a['buy_irt'];
    $profit = $sell - $buy;
    $rem = $sell - $paid; // debt_irt == sell_irt
    $rows[] = [
        'id' => $uid,
        'first_name' => $u['first_name'],
        'last_name' => $u['last_name'],
        'username' => $u['username'],
        'kotaj_count' => $a['count'],
        'used_usd' => $a['usd'],
        'buy_irt' => $buy,
        'sell_irt' => $sell,
        'profit_irt' => $profit,
        'debt_irt' => $sell,
        'paid_irt' => $paid,
        'remaining_irt' => $rem,
        'card_count' => $cards,
        'kotajs' => $kotajListByUser[$uid] ?? [],
    ];
    $totDebt += $sell; $totPaid += $paid; $totRem += $rem;
    $totSell += $sell; $totBuy += $buy; $totProfit += $profit; $totUsd += $a['usd'];
    if ($a['count'] > 0 || $paid > 0) $activeUsers++;
}

// sort by remaining desc (largest debtors first)
usort($rows, fn($a, $b) => $b['remaining_irt'] <=> $a['remaining_irt']);

ts_json(200, [
    'totals' => [
        'users' => $activeUsers,
        'used_usd' => $totUsd,
        'buy_irt' => $totBuy,
        'sell_irt' => $totSell,
        'profit_irt' => $totProfit,
        'debt_irt' => $totDebt,
        'paid_irt' => $totPaid,
        'remaining_irt' => $totRem,
    ],
    'users' => $rows,
]);
