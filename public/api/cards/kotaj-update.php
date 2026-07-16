<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

$body = null;
$hasMultipart = !empty($_POST) || !empty($_FILES);
if ($hasMultipart && isset($_POST['payload'])) {
    $body = json_decode((string)$_POST['payload'], true);
}
if (!is_array($body)) $body = ts_read_json_body();

$id           = (int)($body['id'] ?? 0);
$kotaj_number = preg_replace('/\D+/', '', ts_normalize_digits((string)($body['kotaj_number'] ?? '')));
$kotaj_date_j = trim(ts_normalize_digits((string)($body['kotaj_date_jalali'] ?? '')));
$kotaj_date_g = trim((string)($body['kotaj_date_gregorian'] ?? ''));
$itemsRaw     = isset($body['items']) && is_array($body['items']) ? $body['items'] : [];
$keepAttach   = isset($body['keep_attachments']) && is_array($body['keep_attachments'])
    ? array_values(array_filter(array_map('strval', $body['keep_attachments'])))
    : null;

if ($id <= 0) ts_json_error(400, 'شناسه کوتاژ معتبر نیست');
if ($kotaj_number === '') ts_json_error(400, 'شماره کوتاژ معتبر نیست');
if (!preg_match('/^\d{4}\/\d{1,2}\/\d{1,2}$/', $kotaj_date_j)) ts_json_error(400, 'تاریخ کوتاژ معتبر نیست');
if ($kotaj_date_g !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $kotaj_date_g)) ts_json_error(400, 'تاریخ میلادی معتبر نیست');
if (!$itemsRaw) ts_json_error(400, 'حداقل یک قلم لازم است');

$pdo = ts_db();
if (!ts_column_exists($pdo, 'ts_kotaj', 'attachments')) {
    try { $pdo->exec("ALTER TABLE ts_kotaj ADD COLUMN attachments TEXT NULL"); } catch (Throwable $e) {}
}
$hasAttach = ts_column_exists($pdo, 'ts_kotaj', 'attachments');

$st = $pdo->prepare("SELECT k.id, k.entry_id, k.card_id, a.allocated" . ($hasAttach ? ", k.attachments" : "") . "
                     FROM ts_kotaj k
                     JOIN ts_card_user_access a ON a.card_user_id=k.card_user_id AND a.entry_id=k.entry_id
                     WHERE k.id=? AND k.card_user_id=? LIMIT 1");
$st->execute([$id, (int)$u['id']]);
$row = $st->fetch();
if (!$row) {
    $diag = $pdo->prepare("SELECT k.id, k.entry_id,
                                  (SELECT COUNT(*) FROM ts_card_entries e WHERE e.id=k.entry_id) AS entry_alive
                           FROM ts_kotaj k WHERE k.id=? AND k.card_user_id=? LIMIT 1");
    $diag->execute([$id, (int)$u['id']]);
    $d = $diag->fetch();
    if ($d && (int)$d['entry_alive'] === 0) {
        ts_json_error(409, 'این کوتاژ به سکشن حذف‌شده‌ای متصل است (entry_id=' . (int)$d['entry_id'] . '). لطفاً به مدیر اطلاع دهید.');
    }
    ts_json_error(404, 'کوتاژ یافت نشد یا به سکشن فعلی شما متصل نیست');
}

$entry_id = (int)$row['entry_id'];
$alloc    = (float)$row['allocated'];

$us = $pdo->prepare("SELECT COALESCE(SUM(total_value_usd),0) FROM ts_kotaj WHERE card_user_id=? AND entry_id=? AND id<>?");
$us->execute([(int)$u['id'], $entry_id, $id]);
$used = (float)$us->fetchColumn();
$remain = $alloc - $used;

$items = [];
$totalUsd = 0.0;
foreach ($itemsRaw as $i => $it) {
    $name  = trim((string)($it['name'] ?? ''));
    $val   = (float) ts_normalize_digits((string)($it['value_usd'] ?? '0'));
    $price = (float) ts_normalize_digits((string)($it['unit_price_irt'] ?? '0'));
    if ($name === '') ts_json_error(400, "نام کالای قلم " . ($i+1) . " معتبر نیست");
    if ($val <= 0) ts_json_error(400, "ارزش کالای «$name» معتبر نیست");
    if ($price < 0) ts_json_error(400, "قیمت هر دلار «$name» معتبر نیست");
    $items[] = ['name' => $name, 'value_usd' => $val, 'unit_price_irt' => $price];
    $totalUsd += $val;
}
if ($totalUsd - $remain > 0.0001) {
    ts_json_error(400, "ارزش کل کوتاژ ($totalUsd) از مانده سکشن ($remain) بیشتر است");
}

// Existing attachments
$existing = [];
if ($hasAttach && !empty($row['attachments'])) {
    $d = json_decode((string)$row['attachments'], true);
    if (is_array($d)) $existing = array_values(array_filter(array_map('strval', $d)));
}
$final = $keepAttach !== null ? array_values(array_intersect($existing, $keepAttach)) : $existing;

// Handle new uploads
if (!empty($_FILES['files']) && is_array($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $allowed = ['image/jpeg' => 'jpg','image/png' => 'png','image/webp' => 'webp','application/pdf' => 'pdf'];
    $baseDir = realpath(__DIR__ . '/../../uploads');
    if ($baseDir === false) { @mkdir(__DIR__ . '/../../uploads/kotaj', 0775, true); $baseDir = realpath(__DIR__ . '/../../uploads'); }
    $dir = $baseDir . '/kotaj/' . (int)$u['id'];
    if (!is_dir($dir)) @mkdir($dir, 0775, true);
    if (!is_dir($dir) || !is_writable($dir)) ts_json_error(500, 'خطا در آماده‌سازی پوشه آپلود');
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $n = count($_FILES['files']['name']);
    for ($i = 0; $i < $n; $i++) {
        if ((int)$_FILES['files']['error'][$i] !== UPLOAD_ERR_OK) continue;
        $size = (int)$_FILES['files']['size'][$i];
        if ($size <= 0 || $size > 10 * 1024 * 1024) ts_json_error(400, 'حجم یکی از فایل‌ها بیش از ۱۰ مگابایت است');
        $tmp = $_FILES['files']['tmp_name'][$i];
        $mime = $finfo->file($tmp) ?: '';
        if (!isset($allowed[$mime])) ts_json_error(400, 'فقط تصویر (JPG/PNG/WEBP) یا PDF مجاز است');
        $ext = $allowed[$mime];
        $name = bin2hex(random_bytes(12)) . '.' . $ext;
        $dest = $dir . '/' . $name;
        if (!move_uploaded_file($tmp, $dest)) ts_json_error(500, 'آپلود فایل ناموفق بود');
        $final[] = '/uploads/kotaj/' . (int)$u['id'] . '/' . $name;
    }
}
$attachJson = $final ? json_encode($final, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : null;

$pdo->beginTransaction();
try {
    $sets = ['kotaj_number=?','kotaj_date_jalali=?','total_value_usd=?'];
    $vals = [$kotaj_number, $kotaj_date_j, $totalUsd];
    try {
        $s2 = $sets; $v2 = $vals;
        $s2[] = 'kotaj_date_gregorian=?'; $v2[] = ($kotaj_date_g ?: null);
        if ($hasAttach) { $s2[] = 'attachments=?'; $v2[] = $attachJson; }
        $v2[] = $id;
        $pdo->prepare("UPDATE ts_kotaj SET " . implode(',', $s2) . " WHERE id=?")->execute($v2);
    } catch (Throwable $e) {
        if ($hasAttach) { $sets[] = 'attachments=?'; $vals[] = $attachJson; }
        $vals[] = $id;
        $pdo->prepare("UPDATE ts_kotaj SET " . implode(',', $sets) . " WHERE id=?")->execute($vals);
    }

    $pdo->prepare("DELETE FROM ts_kotaj_items WHERE kotaj_id=?")->execute([$id]);
    $ii = $pdo->prepare("INSERT INTO ts_kotaj_items (kotaj_id, name, value_usd, unit_price_irt) VALUES (?, ?, ?, ?)");
    foreach ($items as $it) {
        $ii->execute([$id, $it['name'], $it['value_usd'], $it['unit_price_irt']]);
    }
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    ts_json_error(500, 'ویرایش کوتاژ با خطا مواجه شد: ' . $e->getMessage());
}

ts_json(200, ['ok' => true, 'attachments' => $final]);
