<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_admin_require();

$filename = 'card-consult-' . date('Ymd-His') . '.csv';
header('Content-Type: text/csv; charset=utf-8');
header("Content-Disposition: attachment; filename=\"$filename\"");

$out = fopen('php://output', 'w');
fwrite($out, "\xEF\xBB\xBF");
fputcsv($out, ['id', 'phone', 'source', 'status', 'ip', 'note', 'created_at', 'updated_at']);

$rows = ts_db()->query('SELECT * FROM ts_card_consult ORDER BY created_at DESC')->fetchAll();
foreach ($rows as $r) {
    fputcsv($out, [
        $r['id'], $r['phone'], $r['source'], $r['status'],
        $r['ip'], $r['note'], $r['created_at'], $r['updated_at'],
    ]);
}
fclose($out);
exit;
