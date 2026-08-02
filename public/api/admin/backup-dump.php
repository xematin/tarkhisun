<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
require __DIR__ . '/_backup_lib.php';
ts_admin_require();

@set_time_limit(300);
@ini_set('memory_limit', '512M');

$pdo    = ts_db();
$format = strtolower(trim((string)($_GET['format'] ?? 'sql')));
$stamp  = date('Ymd-His');

if ($format === 'sql') {
    $sql = ts_backup_sql($pdo);
    header('Content-Type: application/sql; charset=utf-8');
    header("Content-Disposition: attachment; filename=\"tarkhisun-db-$stamp.sql\"");
    header('Content-Length: ' . strlen($sql));
    echo $sql;
    exit;
}

if ($format === 'csv') {
    $tmp = ts_backup_csv_zip($pdo);
    header('Content-Type: application/zip');
    header("Content-Disposition: attachment; filename=\"tarkhisun-db-$stamp-csv.zip\"");
    header('Content-Length: ' . (string)filesize($tmp));
    readfile($tmp);
    @unlink($tmp);
    exit;
}

if ($format === 'xls' || $format === 'excel') {
    $html = ts_backup_xls($pdo);
    header('Content-Type: application/vnd.ms-excel; charset=utf-8');
    header("Content-Disposition: attachment; filename=\"tarkhisun-db-$stamp.xls\"");
    echo "\xEF\xBB\xBF" . $html;
    exit;
}

ts_json_error(400, 'format نامعتبر است (sql | csv | xls)');
