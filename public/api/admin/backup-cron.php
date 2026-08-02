<?php
/**
 * نقطه ورود کرون‌جاب بک‌آپ خودکار (هر ۴۸ ساعت)
 * نمونه کرون در cPanel (هر روز ساعت ۳ بامداد؛ خود اسکریپت بازه ۴۸ ساعت را کنترل می‌کند):
 *   curl -s "https://example.com/api/admin/backup-cron.php?key=YOUR_SECRET"
 * کلید را در config.php با نام backup_cron_secret تعریف کنید.
 */
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';

header('Content-Type: text/plain; charset=utf-8');

$secret = (string)(ts_load_config()['backup_cron_secret'] ?? '');
$key    = (string)($_GET['key'] ?? '');
if ($secret === '' || !hash_equals($secret, $key)) {
    http_response_code(403);
    echo "Forbidden\n";
    exit;
}

@set_time_limit(600);
@ini_set('memory_limit', '512M');

$pdo = ts_db();
if (!ts_backup_is_due($pdo, 48)) {
    echo "SKIP: last backup is newer than 48h\n";
    exit;
}

try {
    $row = ts_backup_store($pdo, 'auto');
    echo "OK: {$row['filename']} ({$row['size_bytes']} bytes)\n";
} catch (Throwable $e) {
    http_response_code(500);
    echo 'ERROR: ' . $e->getMessage() . "\n";
}
