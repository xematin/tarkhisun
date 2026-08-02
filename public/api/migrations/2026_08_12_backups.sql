-- جدول ثبت نسخه‌های پشتیبان دیتابیس
CREATE TABLE IF NOT EXISTS ts_backups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    format VARCHAR(10) NOT NULL DEFAULT 'sql',
    source VARCHAR(10) NOT NULL DEFAULT 'manual',
    size_bytes BIGINT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_filename (filename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
