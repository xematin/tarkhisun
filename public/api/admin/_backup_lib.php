<?php
/**
 * کتابخانه مشترک تولید بک‌آپ دیتابیس
 * فرمت‌ها: sql | csv (zip) | xls
 */
declare(strict_types=1);

function ts_backup_dir(): string {
    $dir = dirname(__DIR__) . '/backups';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    // محافظت از دسترسی مستقیم
    $ht = $dir . '/.htaccess';
    if (!file_exists($ht)) @file_put_contents($ht, "Deny from all\nRequire all denied\n");
    $idx = $dir . '/index.html';
    if (!file_exists($idx)) @file_put_contents($idx, '');
    return $dir;
}

function ts_backup_tables(PDO $pdo): array {
    $tables = [];
    foreach ($pdo->query('SHOW FULL TABLES')->fetchAll(PDO::FETCH_NUM) as $row) {
        if (($row[1] ?? 'BASE TABLE') !== 'BASE TABLE') continue;
        $tables[] = (string)$row[0];
    }
    sort($tables);
    return $tables;
}

function ts_backup_quote(PDO $pdo, $v): string {
    if ($v === null) return 'NULL';
    if (is_int($v) || is_float($v)) return (string)$v;
    return $pdo->quote((string)$v);
}

/** تولید دامپ SQL کامل (CREATE + INSERT) */
function ts_backup_sql(PDO $pdo): string {
    $out  = "-- Tarkhisun DB Backup\n";
    $out .= '-- Generated: ' . date('Y-m-d H:i:s') . "\n";
    $out .= "SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS=0;\nSET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';\n\n";

    foreach (ts_backup_tables($pdo) as $t) {
        $create = $pdo->query('SHOW CREATE TABLE `' . str_replace('`', '``', $t) . '`')->fetch(PDO::FETCH_NUM);
        $out .= "\n-- ----------------------------\n-- Table: $t\n-- ----------------------------\n";
        $out .= "DROP TABLE IF EXISTS `$t`;\n" . ($create[1] ?? '') . ";\n\n";

        $stmt = $pdo->query('SELECT * FROM `' . str_replace('`', '``', $t) . '`');
        $buffer = [];
        $cols = null;
        while ($r = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if ($cols === null) $cols = '`' . implode('`,`', array_keys($r)) . '`';
            $vals = [];
            foreach ($r as $v) $vals[] = ts_backup_quote($pdo, $v);
            $buffer[] = '(' . implode(',', $vals) . ')';
            if (count($buffer) >= 200) {
                $out .= "INSERT INTO `$t` ($cols) VALUES\n" . implode(",\n", $buffer) . ";\n";
                $buffer = [];
            }
        }
        if ($buffer) {
            $out .= "INSERT INTO `$t` ($cols) VALUES\n" . implode(",\n", $buffer) . ";\n";
        }
    }
    $out .= "\nSET FOREIGN_KEY_CHECKS=1;\n";
    return $out;
}

/** تولید فایل ZIP شامل یک CSV به‌ازای هر جدول. مسیر فایل موقت را برمی‌گرداند */
function ts_backup_csv_zip(PDO $pdo): string {
    if (!class_exists('ZipArchive')) {
        ts_json_error(500, 'ZipArchive روی این هاست فعال نیست. از فرمت SQL یا اکسل استفاده کنید.');
    }
    $tmp = tempnam(sys_get_temp_dir(), 'tsbk');
    $zip = new ZipArchive();
    if ($zip->open($tmp, ZipArchive::OVERWRITE) !== true) {
        ts_json_error(500, 'ساخت فایل ZIP ناموفق بود');
    }
    foreach (ts_backup_tables($pdo) as $t) {
        $fh = fopen('php://temp', 'r+');
        fwrite($fh, "\xEF\xBB\xBF");
        $stmt = $pdo->query('SELECT * FROM `' . str_replace('`', '``', $t) . '`');
        $head = false;
        while ($r = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (!$head) { fputcsv($fh, array_keys($r)); $head = true; }
            fputcsv($fh, array_map(static fn($v) => $v === null ? '' : (string)$v, $r));
        }
        if (!$head) {
            $cols = $pdo->query('SHOW COLUMNS FROM `' . str_replace('`', '``', $t) . '`')->fetchAll(PDO::FETCH_COLUMN);
            fputcsv($fh, $cols);
        }
        rewind($fh);
        $zip->addFromString($t . '.csv', (string)stream_get_contents($fh));
        fclose($fh);
    }
    $zip->close();
    return $tmp;
}

/** تولید فایل اکسل (XLS مبتنی بر HTML، چند شیت) */
function ts_backup_xls(PDO $pdo): string {
    $h  = '<html xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8">';
    $h .= '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>';
    $tables = ts_backup_tables($pdo);
    foreach ($tables as $t) {
        $h .= '<x:ExcelWorksheet><x:Name>' . htmlspecialchars(substr($t, 0, 31)) . '</x:Name>'
            . '<x:WorksheetOptions><x:Panes/></x:WorksheetOptions></x:ExcelWorksheet>';
    }
    $h .= '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
    $h .= '<style>table{border-collapse:collapse;font-family:Tahoma;font-size:11px}td,th{border:1px solid #999;padding:3px}th{background:#e2e8f0}</style></head><body>';

    foreach ($tables as $t) {
        $h .= '<h3>' . htmlspecialchars($t) . '</h3><table>';
        $stmt = $pdo->query('SELECT * FROM `' . str_replace('`', '``', $t) . '`');
        $head = false;
        while ($r = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (!$head) {
                $h .= '<tr>';
                foreach (array_keys($r) as $c) $h .= '<th>' . htmlspecialchars((string)$c) . '</th>';
                $h .= '</tr>';
                $head = true;
            }
            $h .= '<tr>';
            foreach ($r as $v) $h .= '<td>' . htmlspecialchars($v === null ? '' : (string)$v) . '</td>';
            $h .= '</tr>';
        }
        if (!$head) {
            $cols = $pdo->query('SHOW COLUMNS FROM `' . str_replace('`', '``', $t) . '`')->fetchAll(PDO::FETCH_COLUMN);
            $h .= '<tr>';
            foreach ($cols as $c) $h .= '<th>' . htmlspecialchars((string)$c) . '</th>';
            $h .= '</tr>';
        }
        $h .= '</table><br/>';
    }
    return $h . '</body></html>';
}

function ts_backup_ensure_schema(PDO $pdo): void {
    $pdo->exec("CREATE TABLE IF NOT EXISTS ts_backups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        format VARCHAR(10) NOT NULL DEFAULT 'sql',
        source VARCHAR(10) NOT NULL DEFAULT 'manual',
        size_bytes BIGINT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_filename (filename)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}

/** ساخت و ذخیره یک بک‌آپ SQL روی سرور + نگهداری ۱۰ نسخه آخر */
function ts_backup_store(PDO $pdo, string $source = 'manual'): array {
    ts_backup_ensure_schema($pdo);
    $dir  = ts_backup_dir();
    $name = 'backup-' . $source . '-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.sql';
    $path = $dir . '/' . $name;
    $sql  = ts_backup_sql($pdo);
    if (@file_put_contents($path, $sql) === false) {
        ts_json_error(500, 'نوشتن فایل بک‌آپ ناموفق بود. دسترسی نوشتن پوشه api/backups را بررسی کنید.');
    }
    $size = (int)filesize($path);
    $st = $pdo->prepare('INSERT INTO ts_backups (filename, format, source, size_bytes) VALUES (?, ?, ?, ?)');
    $st->execute([$name, 'sql', $source, $size]);
    $id = (int)$pdo->lastInsertId();

    // نگهداری ۱۰ نسخه آخر
    try {
        $old = $pdo->query('SELECT id, filename FROM ts_backups ORDER BY created_at DESC, id DESC LIMIT 100 OFFSET 10')->fetchAll();
        foreach ($old as $o) {
            @unlink($dir . '/' . basename((string)$o['filename']));
            $pdo->prepare('DELETE FROM ts_backups WHERE id = ?')->execute([(int)$o['id']]);
        }
    } catch (Throwable $e) { /* ignore */ }

    return ['id' => $id, 'filename' => $name, 'size_bytes' => $size, 'source' => $source, 'format' => 'sql'];
}

/** آیا از آخرین بک‌آپ بیش از ۴۸ ساعت گذشته است؟ */
function ts_backup_is_due(PDO $pdo, int $hours = 48): bool {
    ts_backup_ensure_schema($pdo);
    $last = $pdo->query('SELECT MAX(created_at) FROM ts_backups')->fetchColumn();
    if (!$last) return true;
    return (time() - strtotime((string)$last)) >= $hours * 3600;
}
