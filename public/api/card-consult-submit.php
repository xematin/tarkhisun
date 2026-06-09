<?php
declare(strict_types=1);
require __DIR__ . '/db.php';

ts_cors_same_origin();
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ts_json_error(405, 'Method not allowed');
}

$body   = ts_read_json_body();
$phone  = ts_normalize_digits(trim((string)($body['phone'] ?? '')));
$source = mb_substr(trim((string)($body['source'] ?? 'business-card-hero')), 0, 50);

if (!ts_valid_phone($phone)) {
    ts_json_error(400, 'Invalid phone format. Expected 09XXXXXXXXX');
}

$pdo = ts_db();
$now = date('Y-m-d H:i:s');
$ip  = ts_client_ip();
$ua  = mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);

try {
    $stmt = $pdo->prepare(
        'INSERT INTO ts_card_consult (phone, source, ip, user_agent, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, "new", ?, ?)'
    );
    $stmt->execute([$phone, $source, $ip, $ua, $now, $now]);
} catch (Throwable $e) {
    ts_json_error(500, 'DB error', $e->getMessage());
}

ts_json(200, ['ok' => true]);
