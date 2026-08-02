<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_cors_same_origin();
ts_admin_require();

$pdo = ts_db();
ts_backup_ensure_schema($pdo);
$dir = ts_backup_dir();

// بک‌آپ خودکار تنبل: اگر بیش از ۴۸ ساعت گذشته باشد
$autoCreated = false;
if (((int)($_GET['auto'] ?? 1)) === 1) {
    try {
        if (ts_backup_is_due($pdo, 48)) {
            @set_time_limit(300);
            @ini_set('memory_limit', '512M');
            ts_backup_store($pdo, 'auto');
            $autoCreated = true;
        }
    } catch (Throwable $e) { /* silent */ }
}

$items = [];
foreach ($pdo->query('SELECT * FROM ts_backups ORDER BY created_at DESC, id DESC')->fetchAll() as $r) {
    $path = $dir . '/' . basename((string)$r['filename']);
    $items[] = [
        'id'          => (int)$r['id'],
        'filename'    => (string)$r['filename'],
        'format'      => (string)$r['format'],
        'source'      => (string)$r['source'],
        'size_bytes'  => (int)$r['size_bytes'],
        'created_at'  => (string)$r['created_at'],
        'exists'      => file_exists($path),
    ];
}

$last = $pdo->query('SELECT MAX(created_at) FROM ts_backups')->fetchColumn();

ts_json(200, [
    'items'        => $items,
    'last_backup'  => $last ?: null,
    'auto_created' => $autoCreated,
    'writable'     => is_writable($dir),
]);
