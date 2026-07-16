<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

// Accept either JSON body OR multipart/form-data with a `payload` field + optional files[]
$body = null;
$hasMultipart = !empty($_POST) || !empty($_FILES);
if ($hasMultipart && isset($_POST['payload'])) {
    $body = json_decode((string)$_POST['payload'], true);
}
if (!is_array($body)) $body = ts_read_json_body();

$entry_id     = (int)($body['entry_id'] ?? 0);
$kotaj_number = preg_replace('/\D+/', '', ts_normalize_digits((string)($body['kotaj_number'] ?? '')));
$kotaj_date_j = trim(ts_normalize_digits((string)($body['kotaj_date_jalali'] ?? '')));
$kotaj_date_g = trim((string)($body['kotaj_date_gregorian'] ?? ''));
$itemsRaw     = isset($body['items']) && is_array($body['items']) ? $body['items'] : [];

if ($entry_id <= 0) ts_json_error(400, 'سکشن کارت معتبر نیست');
if ($kotaj_number === '') ts_json_error(400, 'شماره کوتاژ معتبر نیست');
if (!preg_match('/^\d{4}\/\d{1,2}\/\d{1,2}$/', $kotaj_date_j)) ts_json_error(400, 'تاریخ کوتاژ معتبر نیست');
if ($kotaj_date_g !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $kotaj_date_g)) ts_json_error(400, 'تاریخ میلادی معتبر نیست');
if (!$itemsRaw) ts_json_error(400, 'حداقل یک قلم لازم است');

$pdo = ts_db();

// Auto-add attachments column if missing
if (!ts_column_exists($pdo, 'ts_kotaj', 'attachments')) {
    try { $pdo->exec("ALTER TABLE ts_kotaj ADD COLUMN attachments TEXT NULL"); } catch (Throwable $e) {}
}
$hasAttach = ts_column_exists($pdo, 'ts_kotaj', 'attachments');

// Verify access
$ac = $pdo->prepare("SELECT id, card_id, allocated FROM ts_card_user_access WHERE card_user_id=? AND entry_id=? LIMIT 1");
$ac->execute([(int)$u['id'], $entry_id]);
$access = $ac->fetch();
if (!$access) ts_json_error(403, 'دسترسی به این سکشن ندارید');

$cardId = (int)$access['card_id'];
$alloc  = (float)$access['allocated'];

// Used so far
$us = $pdo->prepare("SELECT COALESCE(SUM(total_value_usd),0) FROM ts_kotaj WHERE card_user_id=? AND entry_id=?");
$us->execute([(int)$u['id'], $entry_id]);
$used = (float)$us->fetchColumn();
$remain = $alloc - $used;

// Validate items
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

// Handle optional attachments (multi)
$savedPaths = [];
if (!empty($_FILES['files']) && is_array($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $allowed = [
        'image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'application/pdf' => 'pdf',
    ];
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
        $savedPaths[] = '/uploads/kotaj/' . (int)$u['id'] . '/' . $name;
    }
}
$attachJson = $savedPaths ? json_encode($savedPaths, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : null;

$now = date('Y-m-d H:i:s');
$pdo->beginTransaction();
try {
    $cols = ['card_user_id','card_id','entry_id','kotaj_number','kotaj_date_jalali'];
    $vals = [(int)$u['id'], $cardId, $entry_id, $kotaj_number, $kotaj_date_j];
    if ($kotaj_date_g !== '') { $cols[] = 'kotaj_date_gregorian'; $vals[] = $kotaj_date_g; }
    $cols[] = 'total_value_usd'; $vals[] = $totalUsd;
    if ($hasAttach && $attachJson !== null) { $cols[] = 'attachments'; $vals[] = $attachJson; }
    $cols[] = 'created_at'; $vals[] = $now;

    $place = implode(',', array_fill(0, count($cols), '?'));
    try {
        $ins = $pdo->prepare("INSERT INTO ts_kotaj (" . implode(',', $cols) . ") VALUES ($place)");
        $ins->execute($vals);
    } catch (Throwable $e) {
        // Fallback without gregorian if column missing
        $ci = array_search('kotaj_date_gregorian', $cols, true);
        if ($ci !== false) { array_splice($cols, $ci, 1); array_splice($vals, $ci, 1); }
        $place = implode(',', array_fill(0, count($cols), '?'));
        $ins = $pdo->prepare("INSERT INTO ts_kotaj (" . implode(',', $cols) . ") VALUES ($place)");
        $ins->execute($vals);
    }
    $kid = (int)$pdo->lastInsertId();

    $ii = $pdo->prepare(
        "INSERT INTO ts_kotaj_items (kotaj_id, name, value_usd, unit_price_irt) VALUES (?, ?, ?, ?)"
    );
    foreach ($items as $it) {
        $ii->execute([$kid, $it['name'], $it['value_usd'], $it['unit_price_irt']]);
    }
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    ts_json_error(500, 'ثبت کوتاژ با خطا مواجه شد: ' . $e->getMessage());
}

ts_json(200, ['ok' => true, 'id' => $kid, 'attachments' => $savedPaths]);
