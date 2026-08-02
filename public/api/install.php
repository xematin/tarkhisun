<?php
/**
 * یک‌بار اجرا کنید تا جداول ساخته شوند:
 * https://YOURDOMAIN/api/install.php
 * (پس از موفقیت، فایل را حذف کنید.)
 */
declare(strict_types=1);
require __DIR__ . '/db.php';

header('Content-Type: text/plain; charset=utf-8');

$pdo = ts_db();

$sql = [
    "CREATE TABLE IF NOT EXISTS ts_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(11) NOT NULL UNIQUE,
        first_seen DATETIME NOT NULL,
        last_seen  DATETIME NOT NULL,
        search_count INT NOT NULL DEFAULT 0,
        ip VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_search_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        query VARCHAR(200) NOT NULL,
        created_at DATETIME NOT NULL,
        INDEX idx_lead (lead_id),
        INDEX idx_created (created_at),
        FOREIGN KEY (lead_id) REFERENCES ts_leads(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(64) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_admin_sessions (
        token CHAR(64) PRIMARY KEY,
        admin_id INT NOT NULL,
        expires_at DATETIME NOT NULL,
        INDEX idx_expires (expires_at),
        FOREIGN KEY (admin_id) REFERENCES ts_admins(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    // ===== Cards module =====
    "CREATE TABLE IF NOT EXISTS ts_cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        balance DECIMAL(18,2) NOT NULL DEFAULT 0,
        currency ENUM('USD','EUR','IRT') NOT NULL DEFAULT 'IRT',
        created_by INT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        INDEX idx_created_by (created_by)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name  VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        require_payment_approval TINYINT(1) NOT NULL DEFAULT 0,
        created_by INT NULL,
        created_at DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_entries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        title VARCHAR(150) NOT NULL,
        amount DECIMAL(18,2) NOT NULL DEFAULT 0,
        currency ENUM('USD','EUR','IRT') NOT NULL DEFAULT 'IRT',
        unit_price_irt DECIMAL(18,2) NOT NULL DEFAULT 1,
        total_irt DECIMAL(20,2) NOT NULL DEFAULT 0,
        sort_order INT NOT NULL DEFAULT 0,
        INDEX idx_card (card_id),
        FOREIGN KEY (card_id) REFERENCES ts_cards(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_user_access (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        entry_id INT NULL,
        card_user_id INT NOT NULL,
        allocated DECIMAL(18,2) NOT NULL DEFAULT 0,
        INDEX idx_card_user (card_id, card_user_id),
        INDEX idx_user (card_user_id),
        INDEX idx_entry (entry_id),
        FOREIGN KEY (card_id) REFERENCES ts_cards(id) ON DELETE CASCADE,
        FOREIGN KEY (card_user_id) REFERENCES ts_card_users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_user_sessions (
        token CHAR(64) PRIMARY KEY,
        card_user_id INT NOT NULL,
        expires_at DATETIME NOT NULL,
        INDEX idx_expires (expires_at),
        FOREIGN KEY (card_user_id) REFERENCES ts_card_users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_alloc_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        card_user_id INT NULL,
        admin_id INT NULL,
        admin_username VARCHAR(64) NULL,
        action ENUM('create','update','delete','card_balance','card_delete') NOT NULL,
        before_allocated DECIMAL(18,2) NULL,
        after_allocated DECIMAL(18,2) NULL,
        currency ENUM('USD','EUR','IRT') NULL,
        user_label VARCHAR(255) NULL,
        note VARCHAR(255) NULL,
        created_at DATETIME NOT NULL,
        INDEX idx_card (card_id),
        INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    // ===== Kotaj (customs declaration) =====
    "CREATE TABLE IF NOT EXISTS ts_kotaj (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_user_id INT NOT NULL,
        card_id INT NOT NULL,
        entry_id INT NOT NULL,
        kotaj_number VARCHAR(50) NOT NULL,
        kotaj_date_jalali VARCHAR(10) NOT NULL,
        total_value_usd DECIMAL(18,2) NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL,
        INDEX idx_card (card_id),
        INDEX idx_user (card_user_id),
        INDEX idx_entry (entry_id),
        FOREIGN KEY (card_id) REFERENCES ts_cards(id) ON DELETE CASCADE,
        FOREIGN KEY (card_user_id) REFERENCES ts_card_users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_kotaj_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kotaj_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        value_usd DECIMAL(18,2) NOT NULL DEFAULT 0,
        unit_price_irt DECIMAL(18,2) NOT NULL DEFAULT 0,
        INDEX idx_kotaj (kotaj_id),
        FOREIGN KEY (kotaj_id) REFERENCES ts_kotaj(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    // ===== Payments (user pays card debt) =====
    "CREATE TABLE IF NOT EXISTS ts_card_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        card_user_id INT NOT NULL,
        amount_irt DECIMAL(18,2) NOT NULL DEFAULT 0,
        receipt_path VARCHAR(255) NULL,
        note VARCHAR(255) NULL,
        status ENUM('confirmed','pending','rejected') NOT NULL DEFAULT 'confirmed',
        created_at DATETIME NOT NULL,
        INDEX idx_card (card_id),
        INDEX idx_user (card_user_id),
        FOREIGN KEY (card_id) REFERENCES ts_cards(id) ON DELETE CASCADE,
        FOREIGN KEY (card_user_id) REFERENCES ts_card_users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_card_admin_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        card_id INT NOT NULL,
        admin_id INT NULL,
        amount_irt DECIMAL(18,2) NOT NULL DEFAULT 0,
        pay_date_gregorian DATE NULL,
        pay_date_jalali VARCHAR(20) NULL,
        receipt_path VARCHAR(255) NULL,
        note VARCHAR(500) NULL,
        status ENUM('pending','confirmed','rejected') NOT NULL DEFAULT 'confirmed',
        from_treasury TINYINT(1) NOT NULL DEFAULT 0,
        created_at DATETIME NULL,
        updated_at DATETIME NULL,
        INDEX idx_card (card_id),
        INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    "CREATE TABLE IF NOT EXISTS ts_treasury_ledger (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        direction ENUM('in','out') NOT NULL,
        amount_irt DECIMAL(18,2) NOT NULL DEFAULT 0,
        card_id INT NULL,
        source_type ENUM('user_payment','admin_payment','manual_adjust') NOT NULL,
        source_id BIGINT NULL,
        admin_id INT NULL,
        note VARCHAR(500) NULL,
        occurred_at DATETIME NOT NULL,
        created_at DATETIME NOT NULL,
        INDEX idx_card (card_id),
        INDEX idx_dir (direction),
        INDEX idx_src (source_type, source_id),
        INDEX idx_occurred (occurred_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

    // ===== Business card consultation requests =====
    "CREATE TABLE IF NOT EXISTS ts_card_consult (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(15) NOT NULL,
        source VARCHAR(50) NOT NULL DEFAULT 'business-card-hero',
        ip VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL,
        note VARCHAR(500) NULL,
        status ENUM('new','contacted','done','rejected') NOT NULL DEFAULT 'new',
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        INDEX idx_phone (phone),
        INDEX idx_status (status),
        INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
];


foreach ($sql as $q) {
    $pdo->exec($q);
    echo "OK: " . substr($q, 0, 60) . "...\n";
}

// ===== migrations for existing installs =====
try {
    $col = $pdo->query(
        "SELECT COUNT(*) FROM information_schema.columns
         WHERE table_schema = DATABASE() AND table_name = 'ts_card_user_access' AND column_name = 'allocated'"
    )->fetchColumn();
    if (!$col) {
        $pdo->exec("ALTER TABLE ts_card_user_access ADD COLUMN allocated DECIMAL(18,2) NOT NULL DEFAULT 0");
        echo "OK: added ts_card_user_access.allocated\n";
    }
    $col2 = $pdo->query(
        "SELECT COUNT(*) FROM information_schema.columns
         WHERE table_schema = DATABASE() AND table_name = 'ts_card_user_access' AND column_name = 'entry_id'"
    )->fetchColumn();
    if (!$col2) {
        $pdo->exec("ALTER TABLE ts_card_user_access ADD COLUMN entry_id INT NULL AFTER card_id");
        $pdo->exec("ALTER TABLE ts_card_user_access ADD INDEX idx_entry (entry_id)");
        echo "OK: added ts_card_user_access.entry_id\n";
    }
    // Ensure non-unique replacement indexes exist so FKs can switch off uniq_card_user
    try { $pdo->exec("ALTER TABLE ts_card_user_access ADD INDEX idx_cua_card (card_id)"); } catch (Throwable $e) {}
    try { $pdo->exec("ALTER TABLE ts_card_user_access ADD INDEX idx_cua_user (card_user_id)"); } catch (Throwable $e) {}
    // Drop the well-known legacy unique index by name (multi-entry allocations fix)
    try {
        $pdo->exec("ALTER TABLE ts_card_user_access DROP INDEX uniq_card_user");
        echo "OK: dropped legacy unique index uniq_card_user\n";
    } catch (Throwable $e) {}
    // Sweep any remaining unique indexes on this table (we never want uniques here)
    $idxRows = $pdo->query("SHOW INDEX FROM ts_card_user_access")->fetchAll();
    $byKey = [];
    foreach ($idxRows as $ir) {
        $byKey[$ir['Key_name']][] = $ir;
    }
    foreach ($byKey as $key => $rows) {
        if ($key === 'PRIMARY') continue;
        if ((int)$rows[0]['Non_unique'] === 0) {
            try {
                $pdo->exec("ALTER TABLE ts_card_user_access DROP INDEX `$key`");
                echo "OK: dropped legacy unique index $key\n";
            } catch (Throwable $e) {
                echo "WARN: could not drop $key: " . $e->getMessage() . "\n";
            }
        }
    }
    // custom unit price per (card_user, entry)
    $col3 = $pdo->query(
        "SELECT COUNT(*) FROM information_schema.columns
         WHERE table_schema = DATABASE() AND table_name = 'ts_card_user_access' AND column_name = 'custom_unit_price_irt'"
    )->fetchColumn();
    if (!$col3) {
        $pdo->exec("ALTER TABLE ts_card_user_access ADD COLUMN custom_unit_price_irt DECIMAL(18,2) NULL");
        echo "OK: added ts_card_user_access.custom_unit_price_irt\n";
    }
    $hasCost = false;
    try { $pdo->query('SELECT cost_unit_price_irt FROM ts_cards LIMIT 0'); $hasCost = true; } catch (Throwable $e) {}
    if (!$hasCost) {
        try {
            $pdo->exec("ALTER TABLE ts_cards ADD COLUMN cost_unit_price_irt DECIMAL(18,4) NULL AFTER currency");
            echo "OK: added ts_cards.cost_unit_price_irt\n";
        } catch (Throwable $e) { echo "WARN: " . $e->getMessage() . "\n"; }
    }
    if (!ts_column_exists($pdo, 'ts_card_payments', 'to_treasury')) {
        $pdo->exec("ALTER TABLE ts_card_payments ADD COLUMN to_treasury TINYINT(1) NOT NULL DEFAULT 1 AFTER status");
        echo "OK: added ts_card_payments.to_treasury\n";
    }
    if (!ts_column_exists($pdo, 'ts_card_users', 'require_payment_approval')) {
        $pdo->exec("ALTER TABLE ts_card_users ADD COLUMN require_payment_approval TINYINT(1) NOT NULL DEFAULT 0");
        echo "OK: added ts_card_users.require_payment_approval\n";
    }
    if (!ts_column_exists($pdo, 'ts_card_payments', 'pay_date_gregorian')) {
        $pdo->exec("ALTER TABLE ts_card_payments ADD COLUMN pay_date_gregorian DATE NULL AFTER note");
        echo "OK: added ts_card_payments.pay_date_gregorian\n";
    }
    if (!ts_column_exists($pdo, 'ts_card_payments', 'pay_date_jalali')) {
        $pdo->exec("ALTER TABLE ts_card_payments ADD COLUMN pay_date_jalali VARCHAR(20) NULL AFTER pay_date_gregorian");
        echo "OK: added ts_card_payments.pay_date_jalali\n";
    }
    if (ts_ensure_card_admin_payments_schema($pdo)) echo "OK: ensured ts_card_admin_payments schema\n";
    else echo "WARN: could not auto-ensure ts_card_admin_payments schema; run migrations manually\n";
    if (ts_ensure_cards_tolerance_schema($pdo)) echo "OK: ensured ts_cards tolerance/display columns\n";
    else echo "WARN: could not auto-ensure ts_cards tolerance columns\n";
    if (ts_ensure_treasury_schema($pdo)) echo "OK: ensured ts_treasury_ledger schema\n";
    else echo "WARN: could not auto-ensure ts_treasury_ledger schema; run treasury migration manually\n";
    $bf = ts_treasury_backfill($pdo);
    echo "OK: treasury backfill — inserted $bf row(s)\n";

    // ts_leads: note + status (migration 2026_06_15_leads_status_note.sql)
    if (!ts_column_exists($pdo, 'ts_leads', 'note')) {
        $pdo->exec("ALTER TABLE ts_leads ADD COLUMN note VARCHAR(500) NULL AFTER ip");
        echo "OK: added ts_leads.note\n";
    }
    if (!ts_column_exists($pdo, 'ts_leads', 'status')) {
        $pdo->exec("ALTER TABLE ts_leads ADD COLUMN status ENUM('new','contacted','done','rejected') NOT NULL DEFAULT 'new' AFTER note");
        try { $pdo->exec("ALTER TABLE ts_leads ADD INDEX idx_lead_status (status)"); } catch (Throwable $e) {}
        echo "OK: added ts_leads.status\n";
    }

    // ts_customs_codes (migration 2026_06_20_customs_codes.sql)
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS ts_customs_codes (
            code VARCHAR(10) NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        $cnt = (int)$pdo->query("SELECT COUNT(*) FROM ts_customs_codes")->fetchColumn();
        if ($cnt === 0) {
            $seedFile = __DIR__ . '/migrations/2026_06_20_customs_codes.sql';
            if (file_exists($seedFile)) {
                $sql = file_get_contents($seedFile);
                // Execute as a single multi-statement batch
                $pdo->exec($sql);
                echo "OK: seeded ts_customs_codes\n";
            }
        }
        echo "OK: ensured ts_customs_codes\n";
    } catch (Throwable $e) {
        echo "WARN: ts_customs_codes: " . $e->getMessage() . "\n";
    }



    // ===== One-time data repair: orphan kotaj entry_ids =====
    // ریشه‌ی باگ: نسخه‌ی قدیمی _card_save.php هنگام ویرایش کارت تمام
    // ts_card_entries را DELETE+INSERT می‌کرد و entry_id عوض می‌شد، ولی
    // ts_kotaj.entry_id ها به‌روزرسانی نمی‌شدند.
    try {
        $orphan = (int)$pdo->query(
            "SELECT COUNT(*) FROM ts_kotaj k
             LEFT JOIN ts_card_entries e ON e.id = k.entry_id
             WHERE e.id IS NULL"
        )->fetchColumn();
        if ($orphan > 0) {
            // برای هر کارت، اگر فقط یک سکشن فعال داشته باشد، کوتاژهای یتیم
            // همان کارت را به آن سکشن وصل کن. اگر چند سکشن داشت، به
            // سکشنی با کمترین sort_order/id متصل کن.
            $fix = $pdo->prepare(
                "UPDATE ts_kotaj k
                 JOIN (
                    SELECT card_id, MIN(id) AS new_eid
                    FROM ts_card_entries
                    GROUP BY card_id
                 ) m ON m.card_id = k.card_id
                 LEFT JOIN ts_card_entries e_old ON e_old.id = k.entry_id
                 SET k.entry_id = m.new_eid
                 WHERE e_old.id IS NULL"
            );
            $fix->execute();
            echo "OK: repaired $orphan orphan kotaj entry_id(s)\n";
        }
    } catch (Throwable $e) {
        echo "WARN: orphan kotaj repair failed: " . $e->getMessage() . "\n";
    }
} catch (Throwable $e) {
    echo "WARN: " . $e->getMessage() . "\n";
}

echo "\nنصب با موفقیت انجام شد.\n";
echo "این فایل را از روی هاست حذف کنید.\n";
