<?php
declare(strict_types=1);

/**
 * Shared card save logic (create + update).
 * Body shape:
 *  {
 *    name: string,
 *    entries: [{ title, amount, currency, unit_price_irt }],
 *    users:   [{ entry_index: int, id: int, allocated: number }]
 *  }
 * Returns ['card_id' => int].
 */
function ts_card_save(array $body, int $adminId, ?int $cardId): array {
    $name = trim((string)($body['name'] ?? ''));
    if ($name === '' || mb_strlen($name) > 150) ts_json_error(400, 'نام کارت معتبر نیست');

    $rawEntries = isset($body['entries']) && is_array($body['entries']) ? $body['entries'] : [];
    if (!$rawEntries) ts_json_error(400, 'حداقل یک سکشن مبلغ لازم است');

    $entries = [];
    foreach ($rawEntries as $i => $e) {
        $title    = trim((string)($e['title'] ?? ''));
        $amount   = (float) ts_normalize_digits((string)($e['amount'] ?? '0'));
        $currency = strtoupper(trim((string)($e['currency'] ?? 'IRT')));
        $unit     = (float) ts_normalize_digits((string)($e['unit_price_irt'] ?? '1'));
        if ($title === '' || mb_strlen($title) > 150) ts_json_error(400, "عنوان سکشن «" . ($i+1) . "» معتبر نیست");
        if (!in_array($currency, ['USD','EUR','IRT'], true)) ts_json_error(400, "ارز سکشن «$title» معتبر نیست");
        if ($amount < 0) ts_json_error(400, "مبلغ سکشن «$title» معتبر نیست");
        if ($currency === 'IRT') $unit = 1.0;
        if ($unit < 0) ts_json_error(400, "قیمت واحد سکشن «$title» معتبر نیست");
        $total = round($amount * $unit, 2);
        $entries[] = [
            'title' => $title,
            'amount' => $amount,
            'currency' => $currency,
            'unit_price_irt' => $unit,
            'total_irt' => $total,
            'sort_order' => $i,
        ];
    }

    $balanceIrt = 0.0;
    foreach ($entries as $e) $balanceIrt += $e['total_irt'];

    // optional admin cost per USD (for profit reports)
    $costUnit = null;
    if (array_key_exists('cost_unit_price_irt', $body) && $body['cost_unit_price_irt'] !== '' && $body['cost_unit_price_irt'] !== null) {
        $costUnit = (float) ts_normalize_digits((string)$body['cost_unit_price_irt']);
        if ($costUnit < 0) ts_json_error(400, 'قیمت خرید هر دلار معتبر نیست');
    }

    // Tolerance percent (per-section overage allowance)
    $tolerance = 0.0;
    if (array_key_exists('tolerance_percent', $body) && $body['tolerance_percent'] !== '' && $body['tolerance_percent'] !== null) {
        $tolerance = (float) ts_normalize_digits((string)$body['tolerance_percent']);
        if ($tolerance < 0 || $tolerance > 100) ts_json_error(400, 'درصد تلورانس باید بین ۰ تا ۱۰۰ باشد');
    }

    // users: [{entry_index, id, allocated}]
    $rawUsers = isset($body['users']) && is_array($body['users']) ? $body['users'] : [];
    $allocByEntry = array_fill(0, count($entries), 0.0);
    $userRows = [];
    foreach ($rawUsers as $u) {
        $ei  = (int)($u['entry_index'] ?? -1);
        $uid = (int)($u['id'] ?? 0);
        $al  = (float) ts_normalize_digits((string)($u['allocated'] ?? '0'));
        if ($uid <= 0 || $ei < 0 || $ei >= count($entries)) continue;
        if ($al < 0) ts_json_error(400, 'سهم کاربر نمی‌تواند منفی باشد');
        $userRows[] = ['entry_index' => $ei, 'user_id' => $uid, 'allocated' => $al];
        $allocByEntry[$ei] += $al;
    }
    foreach ($allocByEntry as $i => $sum) {
        if ($sum - $entries[$i]['amount'] > 0.0001) {
            ts_json_error(400, 'مجموع تخصیص‌های سکشن «' . $entries[$i]['title'] . '» از مبلغ آن بیشتر است');
        }
    }

    $pdo = ts_db();
    $now = date('Y-m-d H:i:s');

    // Ensure tolerance/display columns exist before we try to write them
    ts_ensure_cards_tolerance_schema($pdo);

    $customMap = [];
    $pdo->beginTransaction();
    try {
        if ($cardId === null) {
            // create
            $stmt = $pdo->prepare(
                'INSERT INTO ts_cards (name, balance, currency, cost_unit_price_irt, tolerance_percent, created_by, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([$name, $balanceIrt, 'IRT', $costUnit, $tolerance, $adminId, $now, $now]);
            $cardId = (int)$pdo->lastInsertId();

            // create-path: simple inserts for entries
            $entryIds = [];
            $insE = $pdo->prepare(
                'INSERT INTO ts_card_entries (card_id, title, amount, currency, unit_price_irt, total_irt, sort_order)
                 VALUES (?, ?, ?, ?, ?, ?, ?)'
            );
            foreach ($entries as $i => $e) {
                $insE->execute([$cardId, $e['title'], $e['amount'], $e['currency'], $e['unit_price_irt'], $e['total_irt'], $e['sort_order']]);
                $entryIds[$i] = (int)$pdo->lastInsertId();
            }
        } else {
            $exists = $pdo->prepare('SELECT id FROM ts_cards WHERE id=?');
            $exists->execute([$cardId]);
            if (!$exists->fetch()) ts_json_error(404, 'کارت یافت نشد');
            // Note: display_balance_usd and finalized_at are intentionally not touched here;
            // only card-finalize.php / card-finalize-reset.php modify them.
            if ($costUnit !== null) {
                $stmt = $pdo->prepare(
                    'UPDATE ts_cards SET name=?, balance=?, currency=?, cost_unit_price_irt=?, tolerance_percent=?, updated_at=? WHERE id=?'
                );
                $stmt->execute([$name, $balanceIrt, 'IRT', $costUnit, $tolerance, $now, $cardId]);
            } else {
                $stmt = $pdo->prepare(
                    'UPDATE ts_cards SET name=?, balance=?, currency=?, tolerance_percent=?, updated_at=? WHERE id=?'
                );
                $stmt->execute([$name, $balanceIrt, 'IRT', $tolerance, $now, $cardId]);
            }

            // Snapshot custom_unit_price_irt by (card_user_id, entry_title)
            $customMap = [];
            $snap = $pdo->prepare(
                "SELECT a.card_user_id, e.title AS entry_title, a.custom_unit_price_irt
                 FROM ts_card_user_access a
                 JOIN ts_card_entries e ON e.id = a.entry_id
                 WHERE a.card_id = ? AND a.custom_unit_price_irt IS NOT NULL"
            );
            $snap->execute([$cardId]);
            foreach ($snap->fetchAll() as $s) {
                $customMap[(int)$s['card_user_id'] . '|' . $s['entry_title']] = (float)$s['custom_unit_price_irt'];
            }

            // Load existing entries for stable-id matching by title
            $exE = $pdo->prepare("SELECT id, title FROM ts_card_entries WHERE card_id=?");
            $exE->execute([$cardId]);
            $existingByTitle = [];
            foreach ($exE->fetchAll() as $er) {
                $existingByTitle[(string)$er['title']] = (int)$er['id'];
            }

            $entryIds = [];
            $usedExistingIds = [];
            $insE = $pdo->prepare(
                'INSERT INTO ts_card_entries (card_id, title, amount, currency, unit_price_irt, total_irt, sort_order)
                 VALUES (?, ?, ?, ?, ?, ?, ?)'
            );
            $updE = $pdo->prepare(
                'UPDATE ts_card_entries SET amount=?, currency=?, unit_price_irt=?, total_irt=?, sort_order=? WHERE id=?'
            );
            foreach ($entries as $i => $e) {
                $title = (string)$e['title'];
                if (isset($existingByTitle[$title])) {
                    $eid = $existingByTitle[$title];
                    $updE->execute([$e['amount'], $e['currency'], $e['unit_price_irt'], $e['total_irt'], $e['sort_order'], $eid]);
                    $entryIds[$i] = $eid;
                    $usedExistingIds[$eid] = true;
                } else {
                    $insE->execute([$cardId, $e['title'], $e['amount'], $e['currency'], $e['unit_price_irt'], $e['total_irt'], $e['sort_order']]);
                    $entryIds[$i] = (int)$pdo->lastInsertId();
                }
            }

            // Entries to remove: those not used. Block removal if they have kotajs.
            $toRemove = [];
            foreach ($existingByTitle as $title => $eid) {
                if (!isset($usedExistingIds[$eid])) $toRemove[$eid] = $title;
            }
            if ($toRemove) {
                $rids = array_keys($toRemove);
                $place = implode(',', array_fill(0, count($rids), '?'));
                $chk = $pdo->prepare("SELECT entry_id, COUNT(*) c FROM ts_kotaj WHERE entry_id IN ($place) GROUP BY entry_id");
                $chk->execute($rids);
                $blocked = [];
                foreach ($chk->fetchAll() as $br) {
                    if ((int)$br['c'] > 0) $blocked[] = $toRemove[(int)$br['entry_id']];
                }
                if ($blocked) {
                    ts_json_error(409, 'سکشن‌های «' . implode('، ', $blocked) . '» دارای کوتاژ ثبت‌شده‌اند و قابل حذف یا تغییر نام نیستند. ابتدا کوتاژهای مرتبط را حذف کنید.');
                }
                $pdo->prepare("DELETE FROM ts_card_user_access WHERE entry_id IN ($place)")->execute($rids);
                $pdo->prepare("DELETE FROM ts_card_entries WHERE id IN ($place)")->execute($rids);
            }

            // Rebuild access for this card based on incoming user rows
            $pdo->prepare('DELETE FROM ts_card_user_access WHERE card_id=?')->execute([$cardId]);
        }

        if ($userRows) {
            $insU = $pdo->prepare(
                'INSERT INTO ts_card_user_access (card_id, entry_id, card_user_id, allocated)
                 VALUES (?, ?, ?, ?)'
            );
            foreach ($userRows as $u) {
                $insU->execute([$cardId, $entryIds[$u['entry_index']], $u['user_id'], $u['allocated']]);
            }
        }

        // Re-apply preserved custom prices using current entry ids (matched by title).
        if (!empty($customMap)) {
            $upd = $pdo->prepare(
                "UPDATE ts_card_user_access a
                 JOIN ts_card_entries e ON e.id = a.entry_id
                 SET a.custom_unit_price_irt = ?
                 WHERE a.card_id = ? AND a.card_user_id = ? AND e.title = ?"
            );
            foreach ($customMap as $k => $price) {
                [$uid, $title] = explode('|', $k, 2);
                $upd->execute([$price, $cardId, (int)$uid, $title]);
            }
        }

        $pdo->commit();
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        ts_json_error(500, 'ذخیره با خطا مواجه شد: ' . $e->getMessage(), $e->getMessage());
    }

    // Light-weight log entry
    ts_card_alloc_log(
        $cardId, null, 'card_balance', null, $balanceIrt, 'IRT', null,
        ($cardId !== null ? 'به‌روزرسانی' : 'ساخت') . ' کارت «' . $name . '» با ' . count($entries) . ' سکشن'
    );

    return ['card_id' => $cardId];
}
