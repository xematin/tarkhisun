<?php
declare(strict_types=1);
require __DIR__ . '/../db.php';
ts_cors_same_origin();
$u = ts_carduser_require();

// multipart/form-data expected
$card_id = (int)($_POST['card_id'] ?? 0);
$amountRaw = (string)($_POST['amount_irt'] ?? '');
$note = trim((string)($_POST['note'] ?? ''));
$payG = trim((string)($_POST['pay_date_gregorian'] ?? ''));
$payJ = trim((string)($_POST['pay_date_jalali'] ?? ''));
if ($payG !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $payG)) $payG = '';

$amount = (float) ts_normalize_digits($amountRaw);
if ($card_id <= 0) ts_json_error(400, 'کارت معتبر نیست');
if ($amount <= 0) ts_json_error(400, 'مبلغ پرداخت معتبر نیست');

$pdo = ts_db();
// verify access
$ac = $pdo->prepare("SELECT 1 FROM ts_card_user_access WHERE card_user_id=? AND card_id=? LIMIT 1");
$ac->execute([(int)$u['id'], $card_id]);
if (!$ac->fetchColumn()) ts_json_error(403, 'به این کارت دسترسی ندارید');

$receiptPath = null;
if (!empty($_FILES['receipt']) && is_array($_FILES['receipt']) && (int)$_FILES['receipt']['error'] === UPLOAD_ERR_OK) {
    $f = $_FILES['receipt'];
    $size = (int)$f['size'];
    if ($size <= 0 || $size > 10 * 1024 * 1024) ts_json_error(400, 'حجم فیش بیش از حد مجاز (۱۰ مگابایت) است');

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($f['tmp_name']) ?: '';
    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
        'application/pdf' => 'pdf',
    ];
    if (!isset($allowed[$mime])) ts_json_error(400, 'فقط تصویر (JPG/PNG/WEBP) یا PDF مجاز است');
    $ext = $allowed[$mime];

    $baseDir = realpath(__DIR__ . '/../../uploads');
    if ($baseDir === false) {
        @mkdir(__DIR__ . '/../../uploads/payments', 0775, true);
        $baseDir = realpath(__DIR__ . '/../../uploads');
    }
    $dir = $baseDir . '/payments/' . (int)$u['id'];
    if (!is_dir($dir)) @mkdir($dir, 0775, true);
    if (!is_dir($dir) || !is_writable($dir)) ts_json_error(500, 'خطا در آماده‌سازی پوشه آپلود');

    $name = bin2hex(random_bytes(12)) . '.' . $ext;
    $dest = $dir . '/' . $name;
    if (!move_uploaded_file($f['tmp_name'], $dest)) ts_json_error(500, 'آپلود فیش ناموفق بود');
    $receiptPath = '/uploads/payments/' . (int)$u['id'] . '/' . $name;
} else {
    ts_json_error(400, 'تصویر فیش واریزی الزامی است');
}

$now = date('Y-m-d H:i:s');

// Auto-add pay_date columns if missing (backward compatibility)
if (!ts_column_exists($pdo, 'ts_card_payments', 'pay_date_gregorian')) {
    try { $pdo->exec("ALTER TABLE ts_card_payments ADD COLUMN pay_date_gregorian DATE NULL"); } catch (Throwable $e) {}
}
if (!ts_column_exists($pdo, 'ts_card_payments', 'pay_date_jalali')) {
    try { $pdo->exec("ALTER TABLE ts_card_payments ADD COLUMN pay_date_jalali VARCHAR(20) NULL"); } catch (Throwable $e) {}
}
$hasPayDates = ts_column_exists($pdo, 'ts_card_payments', 'pay_date_gregorian')
            && ts_column_exists($pdo, 'ts_card_payments', 'pay_date_jalali');

if ($hasPayDates) {
    $ins = $pdo->prepare(
        "INSERT INTO ts_card_payments (card_id, card_user_id, amount_irt, receipt_path, note, pay_date_gregorian, pay_date_jalali, status, to_treasury, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', 1, ?)"
    );
    $ins->execute([
        $card_id, (int)$u['id'], $amount, $receiptPath, $note !== '' ? $note : null,
        $payG !== '' ? $payG : null, $payJ !== '' ? $payJ : null, $now,
    ]);
} else {
    $ins = $pdo->prepare(
        "INSERT INTO ts_card_payments (card_id, card_user_id, amount_irt, receipt_path, note, status, to_treasury, created_at)
         VALUES (?, ?, ?, ?, ?, 'confirmed', 1, ?)"
    );
    $ins->execute([$card_id, (int)$u['id'], $amount, $receiptPath, $note !== '' ? $note : null, $now]);
}
$paymentId = (int)$pdo->lastInsertId();

// Treasury: use payment date as occurred_at when provided
$occurredAt = $payG !== '' ? ($payG . ' ' . date('H:i:s')) : $now;
ts_treasury_log(
    'in', $amount, $card_id, 'user_payment', $paymentId,
    'پرداخت کاربر #' . (int)$u['id'] . ($note !== '' ? ' — ' . $note : ''),
    $occurredAt
);

ts_json(200, ['ok' => true, 'id' => $paymentId, 'receipt_path' => $receiptPath]);

