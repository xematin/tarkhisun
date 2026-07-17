<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

$pdo = ts_db();

$hasTol = ts_column_exists($pdo, 'ts_cards', 'tolerance_percent');
$tolSel = $hasTol ? 'c.tolerance_percent' : '0 AS tolerance_percent';

$stmt = $pdo->prepare(
    "SELECT c.id AS card_id, c.name AS card_name, c.updated_at, $tolSel,
            a.id AS access_id, a.entry_id, a.allocated,
            a.custom_unit_price_irt AS unit_price_irt,
            e.title AS entry_title, e.currency AS entry_currency
     FROM ts_card_user_access a
     JOIN ts_cards c ON c.id = a.card_id
     LEFT JOIN ts_card_entries e ON e.id = a.entry_id
     WHERE a.card_user_id = ?
     ORDER BY c.id DESC, e.sort_order, e.id"
);
$stmt->execute([(int)$u['id']]);
$accessRows = $stmt->fetchAll();

// Per-entry USD used by kotaj
$usedByEntry = [];
$ks = $pdo->prepare("SELECT entry_id, SUM(total_value_usd) AS s FROM ts_kotaj WHERE card_user_id=? GROUP BY entry_id");
$ks->execute([(int)$u['id']]);
foreach ($ks->fetchAll() as $r) {
    $usedByEntry[(int)$r['entry_id']] = (float)$r['s'];
}

// Per-card kotaj toman totals (this user)
$kotajTomanByCard = [];
$kts = $pdo->prepare(
    "SELECT k.card_id, COALESCE(SUM(i.value_usd * i.unit_price_irt),0) AS toman
     FROM ts_kotaj k
     JOIN ts_kotaj_items i ON i.kotaj_id = k.id
     WHERE k.card_user_id = ?
     GROUP BY k.card_id"
);
$kts->execute([(int)$u['id']]);
foreach ($kts->fetchAll() as $r) {
    $kotajTomanByCard[(int)$r['card_id']] = (float)$r['toman'];
}

// Per-card payments totals (this user, confirmed)
$paymentsByCard = [];
try {
    $ps = $pdo->prepare(
        "SELECT card_id, COALESCE(SUM(amount_irt),0) AS s
         FROM ts_card_payments
         WHERE card_user_id=? AND status='confirmed'
         GROUP BY card_id"
    );
    $ps->execute([(int)$u['id']]);
    foreach ($ps->fetchAll() as $r) {
        $paymentsByCard[(int)$r['card_id']] = (float)$r['s'];
    }
} catch (Throwable $e) {
    // table may not exist yet on old installs — ignore
}

$cards = [];
foreach ($accessRows as $r) {
    $cid = (int)$r['card_id'];
    if (!isset($cards[$cid])) {
        $cards[$cid] = [
            'id' => $cid,
            'name' => $r['card_name'],
            'updated_at' => $r['updated_at'],
            'tolerance_percent' => (float)($r['tolerance_percent'] ?? 0),
            'entries' => [],
            'total_irt' => 0.0,
            'total_usd' => 0.0,
            'remaining_usd' => 0.0,
            'kotaj_toman_total' => $kotajTomanByCard[$cid] ?? 0.0,
            'payments_toman_total' => $paymentsByCard[$cid] ?? 0.0,
            'debt_toman' => max(0, ($kotajTomanByCard[$cid] ?? 0.0) - ($paymentsByCard[$cid] ?? 0.0)),
        ];
    }
    $alloc = (float)$r['allocated'];
    $hasCustom = $r['unit_price_irt'] !== null;
    $unit  = $hasCustom ? (float)$r['unit_price_irt'] : 0.0;
    $cur   = $r['entry_currency'] ?? 'IRT';
    $eid   = $r['entry_id'] !== null ? (int)$r['entry_id'] : null;
    $used  = $eid !== null ? ($usedByEntry[$eid] ?? 0.0) : 0.0;
    $remain = max(0, $alloc - $used);
    $totalIrt = $hasCustom ? round($alloc * $unit, 2) : 0.0;
    $cards[$cid]['entries'][] = [
        'entry_id' => $eid,
        'title' => $r['entry_title'] ?? '—',
        'currency' => $cur,
        'unit_price_irt' => $unit,
        'has_custom_price' => $hasCustom,
        'allocated' => $alloc,
        'used_usd' => $used,
        'remaining' => $remain,
        'total_irt' => $totalIrt,
    ];
    $cards[$cid]['total_irt'] += $totalIrt;
    if ($cur === 'USD') {
        $cards[$cid]['total_usd'] += $alloc;
        $cards[$cid]['remaining_usd'] += $remain;
    }
}

ts_json(200, ['items' => array_values($cards)]);
