<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();
ts_ensure_card_admin_payments_schema($pdo);
ts_ensure_cards_tolerance_schema($pdo);

// detect cost_unit_price_irt column
$hasCost = false;
try { $pdo->query('SELECT cost_unit_price_irt FROM ts_cards LIMIT 0'); $hasCost = true; } catch (Throwable $e) {}
$costSel = $hasCost ? 'c.cost_unit_price_irt,' : 'NULL AS cost_unit_price_irt,';

$hasTol = ts_column_exists($pdo, 'ts_cards', 'tolerance_percent');
$hasDisp = ts_column_exists($pdo, 'ts_cards', 'display_balance_usd');
$hasFin = ts_column_exists($pdo, 'ts_cards', 'finalized_at');
$tolSel  = $hasTol  ? 'c.tolerance_percent,'   : '0 AS tolerance_percent,';
$dispSel = $hasDisp ? 'c.display_balance_usd,' : 'NULL AS display_balance_usd,';
$finSel  = $hasFin  ? 'c.finalized_at,'        : 'NULL AS finalized_at,';

$rows = $pdo->query(
    "SELECT c.id, c.name, c.balance, c.currency, $costSel $tolSel $dispSel $finSel c.created_at, c.updated_at
     FROM ts_cards c
     ORDER BY c.id DESC"
)->fetchAll();

if ($rows) {
    $ids = array_column($rows, 'id');
    $place = implode(',', array_fill(0, count($ids), '?'));

    // entries
    $eStmt = $pdo->prepare(
        "SELECT id, card_id, title, amount, currency, unit_price_irt, total_irt, sort_order
         FROM ts_card_entries WHERE card_id IN ($place)
         ORDER BY card_id, sort_order, id"
    );
    $eStmt->execute($ids);
    $entriesByCard = [];
    $entryMap = [];
    foreach ($eStmt->fetchAll() as $e) {
        $cid = (int)$e['card_id'];
        $row = [
            'id' => (int)$e['id'],
            'title' => $e['title'],
            'amount' => (float)$e['amount'],
            'currency' => $e['currency'],
            'unit_price_irt' => (float)$e['unit_price_irt'],
            'total_irt' => (float)$e['total_irt'],
            'sort_order' => (int)$e['sort_order'],
            'users' => [],
        ];
        $entriesByCard[$cid][] = $row;
        $entryMap[(int)$e['id']] = ['card' => $cid, 'idx' => count($entriesByCard[$cid]) - 1];
    }

    // user access (per entry)
    $aStmt = $pdo->prepare(
        "SELECT a.id AS access_id, a.card_id, a.entry_id, a.card_user_id, a.allocated, a.custom_unit_price_irt,
                u.first_name, u.last_name, u.username
         FROM ts_card_user_access a
         JOIN ts_card_users u ON u.id = a.card_user_id
         WHERE a.card_id IN ($place)"
    );
    $aStmt->execute($ids);
    $usersByCard = [];
    foreach ($aStmt->fetchAll() as $a) {
        $cid = (int)$a['card_id'];
        $eid = $a['entry_id'] !== null ? (int)$a['entry_id'] : null;
        $payload = [
            'access_id' => (int)$a['access_id'],
            'id' => (int)$a['card_user_id'],
            'first_name' => $a['first_name'],
            'last_name'  => $a['last_name'],
            'username'   => $a['username'],
            'allocated'  => (float)$a['allocated'],
            'custom_unit_price_irt' => $a['custom_unit_price_irt'] !== null ? (float)$a['custom_unit_price_irt'] : null,
        ];
        if ($eid !== null && isset($entryMap[$eid])) {
            $loc = $entryMap[$eid];
            $entriesByCard[$loc['card']][$loc['idx']]['users'][] = $payload;
        }
        $usersByCard[$cid][(int)$a['card_user_id']] = [
            'id' => (int)$a['card_user_id'],
            'first_name' => $a['first_name'],
            'last_name'  => $a['last_name'],
            'username'   => $a['username'],
            'allocated'  => ($usersByCard[$cid][(int)$a['card_user_id']]['allocated'] ?? 0) + (float)$a['allocated'],
        ];
    }

    // kotaj toman totals per card & per entry
    $kStmt = $pdo->prepare(
        "SELECT k.card_id, k.entry_id, COALESCE(SUM(i.value_usd * i.unit_price_irt),0) AS toman
         FROM ts_kotaj k
         JOIN ts_kotaj_items i ON i.kotaj_id = k.id
         WHERE k.card_id IN ($place)
         GROUP BY k.card_id, k.entry_id"
    );
    $kStmt->execute($ids);
    $kotajByCard = [];
    $kotajByEntry = [];
    foreach ($kStmt->fetchAll() as $kr) {
        $cid = (int)$kr['card_id']; $eid = (int)$kr['entry_id']; $t = (float)$kr['toman'];
        $kotajByCard[$cid] = ($kotajByCard[$cid] ?? 0) + $t;
        $kotajByEntry[$eid] = $t;
    }

    // kotaj USD totals per card & per entry (independent of unit price)
    $kUStmt = $pdo->prepare(
        "SELECT k.card_id, k.entry_id, COALESCE(SUM(k.total_value_usd),0) AS usd
         FROM ts_kotaj k
         WHERE k.card_id IN ($place)
         GROUP BY k.card_id, k.entry_id"
    );
    $kUStmt->execute($ids);
    $kotajUsdByCard = [];
    $kotajUsdByEntry = [];
    foreach ($kUStmt->fetchAll() as $kr) {
        $cid = (int)$kr['card_id']; $eid = (int)$kr['entry_id']; $u = (float)$kr['usd'];
        $kotajUsdByCard[$cid] = ($kotajUsdByCard[$cid] ?? 0) + $u;
        $kotajUsdByEntry[$eid] = $u;
    }

    // admin payments to card owner (confirmed)
    $apByCard = [];
    try {
        $apStmt = $pdo->prepare(
            "SELECT card_id, COALESCE(SUM(amount_irt),0) AS s
             FROM ts_card_admin_payments
             WHERE status='confirmed' AND card_id IN ($place)
             GROUP BY card_id"
        );
        $apStmt->execute($ids);
        foreach ($apStmt->fetchAll() as $ap) {
            $apByCard[(int)$ap['card_id']] = (float)$ap['s'];
        }
    } catch (Throwable $e) { $apByCard = []; }

    foreach ($rows as &$r) {
        $cid = (int)$r['id'];
        $r['cost_unit_price_irt'] = isset($r['cost_unit_price_irt']) && $r['cost_unit_price_irt'] !== null
            ? (float)$r['cost_unit_price_irt'] : null;
        $r['tolerance_percent'] = (float)($r['tolerance_percent'] ?? 0);
        $r['display_balance_usd'] = isset($r['display_balance_usd']) && $r['display_balance_usd'] !== null
            ? (float)$r['display_balance_usd'] : null;
        $r['entries'] = $entriesByCard[$cid] ?? [];
        foreach ($r['entries'] as &$ent) {
            $ent['kotaj_toman_total'] = $kotajByEntry[(int)$ent['id']] ?? 0.0;
            $ent['kotaj_usd_total']   = $kotajUsdByEntry[(int)$ent['id']] ?? 0.0;
        }
        unset($ent);
        $r['users']   = array_values($usersByCard[$cid] ?? []);
        $r['user_count'] = count($r['users']);
        $r['allocated_total'] = 0.0;
        foreach ($r['users'] as $u) $r['allocated_total'] += $u['allocated'];
        $r['remaining'] = max(0, (float)$r['balance'] - (float)$r['allocated_total']);
        $r['kotaj_toman_total'] = $kotajByCard[$cid] ?? 0.0;
        $r['kotaj_usd_total']   = $kotajUsdByCard[$cid] ?? 0.0;
        $paid = $apByCard[$cid] ?? 0.0;
        $r['admin_paid_irt'] = $paid;
        $r['admin_debt_remaining_irt'] = max(0, (float)$r['balance'] - $paid);
    }
}

ts_json(200, ['items' => $rows]);
