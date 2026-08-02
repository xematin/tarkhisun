<?php
/**
 * نمونه فایل پیکربندی - این فایل را به config.php کپی کنید
 * cp public/api/config.sample.php public/api/config.php
 */

return [
    'db' => [
        'host'     => 'localhost',
        'name'     => 'YOUR_DB_NAME',
        'user'     => 'YOUR_DB_USER',
        'pass'     => 'YOUR_DB_PASSWORD',
        'charset'  => 'utf8mb4',
    ],
    // اگر می‌خواهید ست‌آپ اولیه فقط با یک کلید مخفی ممکن باشد، اینجا تنظیم کنید
    // اگر خالی باشد، فقط زمانی که هیچ ادمینی نیست setup فعال است
    'setup_secret' => '',
    // طول عمر سشن ادمین به ثانیه (پیش‌فرض ۷ روز)
    'admin_session_ttl' => 60 * 60 * 24 * 7,
    // مدت کش پاسخ سرچ HS Code (پیش‌فرض ۶۰ ثانیه) - بدون استفاده فعلی
    'cache_ttl' => 60,
    // کلید مخفی کرون‌جاب بک‌آپ خودکار (هر ۴۸ ساعت)
    // نمونه کرون: curl -s "https://example.com/api/admin/backup-cron.php?key=YOUR_SECRET"
    'backup_cron_secret' => '',

];
