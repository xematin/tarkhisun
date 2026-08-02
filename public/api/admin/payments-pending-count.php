<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();

$count = 0;
$items = [];
try {
    $r = $pdo->query("SELECT COUNT(*) AS n FROM ts_card_payments WHERE status='pending'")->fetch();
    $count = (int)($r['n'] ?? 0);
    if ($count > 0) {
        $st = $pdo->query(
            "SELECT p.id, p.amount_irt, p.created_at, p.note,
                    c.name AS card_name,
                    u.first_name, u.last_name, u.username
             FROM ts_card_payments p
             LEFT JOIN ts_cards c ON c.id = p.card_id
             LEFT JOIN ts_card_users u ON u.id = p.card_user_id
             WHERE p.status='pending'
             ORDER BY p.id DESC
             LIMIT 10"
        );
        $items = $st->fetchAll();
        foreach ($items as &$it) {
            $it['id'] = (int)$it['id'];
            $it['amount_irt'] = (float)$it['amount_irt'];
        }
        unset($it);
    }
} catch (Throwable $e) {
    $count = 0; $items = [];
}

ts_json(200, ['count' => $count, 'items' => $items]);
