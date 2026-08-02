<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();
ts_backup_ensure_schema($pdo);
$dir = ts_backup_dir();

// حجم واقعی فایل‌های بک‌آپ روی دیسک
$backupsSize = 0;
$backupsCount = 0;
foreach ((array)@scandir($dir) as $f) {
    if ($f === '.' || $f === '..') continue;
    $p = $dir . '/' . $f;
    if (is_file($p) && substr($f, -4) === '.sql') {
        $backupsSize += (int)@filesize($p);
        $backupsCount++;
    }
}

// فضای دیسک هاست
$total = @disk_total_space($dir);
$free  = @disk_free_space($dir);
$total = is_numeric($total) ? (float)$total : null;
$free  = is_numeric($free) ? (float)$free : null;
$used  = ($total !== null && $free !== null) ? max(0.0, $total - $free) : null;

// حجم دیتابیس
$dbSize = null;
try {
    $name = (string)(ts_load_config()['db']['name'] ?? '');
    if ($name !== '') {
        $st = $pdo->prepare('SELECT COALESCE(SUM(data_length + index_length), 0) FROM information_schema.tables WHERE table_schema = ?');
        $st->execute([$name]);
        $dbSize = (float)$st->fetchColumn();
    }
} catch (Throwable $e) { $dbSize = null; }

ts_json(200, [
    'disk_total'    => $total,
    'disk_free'     => $free,
    'disk_used'     => $used,
    'backups_size'  => $backupsSize,
    'backups_count' => $backupsCount,
    'db_size'       => $dbSize,
    'writable'      => is_writable($dir),
]);
