<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$admin = ts_admin_require();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') ts_json_error(405, 'Method not allowed');

$body = ts_read_json_body();
$id   = (int)($body['id'] ?? 0);
$mode = (string)($body['mode'] ?? 'finalize'); // finalize | reset
if ($id <= 0) ts_json_error(400, 'شناسه کارت معتبر نیست');

$pdo = ts_db();
ts_ensure_cards_tolerance_schema($pdo);

$st = $pdo->prepare('SELECT id, name, balance FROM ts_cards WHERE id=? LIMIT 1');
$st->execute([$id]);
$card = $st->fetch();
if (!$card) ts_json_error(404, 'کارت یافت نشد');

if ($mode === 'reset') {
    $pdo->prepare('UPDATE ts_cards SET display_balance_usd=NULL, display_balance_irt=NULL, finalized_at=NULL, updated_at=? WHERE id=?')
        ->execute([date('Y-m-d H:i:s'), $id]);
    ts_card_alloc_log(
        $id, null, 'card_balance', null, null, 'USD', null,
        'لغو اتمام کارت «' . $card['name'] . '» — بازگشت به نمایش سقف اصلی'
    );
    ts_json(200, ['ok' => true, 'display_balance_usd' => null, 'display_balance_irt' => null, 'finalized_at' => null]);
}

// finalize: snapshot sum of kotaj USD + Toman for this card
$s = $pdo->prepare('SELECT COALESCE(SUM(total_value_usd),0) FROM ts_kotaj WHERE card_id=?');
$s->execute([$id]);
$sumUsd = (float)$s->fetchColumn();

$si = $pdo->prepare('SELECT COALESCE(SUM(i.value_usd * i.unit_price_irt),0) FROM ts_kotaj k JOIN ts_kotaj_items i ON i.kotaj_id = k.id WHERE k.card_id=?');
$si->execute([$id]);
$sumIrt = (float)$si->fetchColumn();

// ceiling for informational log (sum of USD entries)
$c = $pdo->prepare("SELECT COALESCE(SUM(amount),0) FROM ts_card_entries WHERE card_id=? AND currency='USD'");
$c->execute([$id]);
$ceilingUsd = (float)$c->fetchColumn();

$now = date('Y-m-d H:i:s');
$pdo->prepare('UPDATE ts_cards SET display_balance_usd=?, display_balance_irt=?, finalized_at=?, updated_at=? WHERE id=?')
    ->execute([$sumUsd, $sumIrt, $now, $now, $id]);

ts_card_alloc_log(
    $id, null, 'card_balance', $ceilingUsd, $sumUsd, 'USD', null,
    'اتمام کارت «' . $card['name'] . '» — موجودی نمایشی ' . rtrim(rtrim(number_format($sumUsd, 2, '.', ''), '0'), '.') . ' دلار / ' . number_format($sumIrt, 0, '.', ',') . ' تومان (سقف اصلی ' . rtrim(rtrim(number_format($ceilingUsd, 2, '.', ''), '0'), '.') . ' دلار / ' . number_format((float)$card['balance'], 0, '.', ',') . ' تومان)'
);

ts_json(200, ['ok' => true, 'display_balance_usd' => $sumUsd, 'display_balance_irt' => $sumIrt, 'finalized_at' => $now]);
