-- مهاجرت: تأیید دستی پرداخت‌های کاربران کارت
-- این فایل را در phpMyAdmin یا کنسول MySQL یک‌بار اجرا کنید (یا install.php را اجرا کنید).

ALTER TABLE ts_card_users
  ADD COLUMN require_payment_approval TINYINT(1) NOT NULL DEFAULT 0;
