<?php
/**
 * اتصال به MySQL + helper های مشترک
 */

declare(strict_types=1);

function ts_load_config(): array {
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $path = __DIR__ . '/config.php';
    if (!file_exists($path)) {
        ts_json_error(500, 'config.php not found. Copy config.sample.php to config.php and fill DB credentials.');
    }
    $cfg = require $path;
    return $cfg;
}

function ts_db(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $c = ts_load_config()['db'];
    $dsn = "mysql:host={$c['host']};dbname={$c['name']};charset={$c['charset']}";
    try {
        $pdo = new PDO($dsn, $c['user'], $c['pass'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    } catch (PDOException $e) {
        ts_json_error(500, 'DB connection failed', $e->getMessage());
    }
    return $pdo;
}

function ts_json(int $status, $payload): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ts_json_error(int $status, string $message, string $detail = ''): void {
    ts_json($status, ['error' => $message] + ($detail ? ['detail' => $detail] : []));
}

function ts_normalize_digits(string $s): string {
    $fa = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    $ar = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    $en = ['0','1','2','3','4','5','6','7','8','9'];
    return str_replace($ar, $en, str_replace($fa, $en, $s));
}

function ts_gregorian_to_jalali(string $date): ?string {
    $parts = explode('-', substr($date, 0, 10));
    if (count($parts) !== 3) return null;
    [$gy, $gm, $gd] = array_map('intval', $parts);
    if ($gy <= 0 || $gm <= 0 || $gd <= 0) return null;
    $g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
    $gy2 = ($gm > 2) ? ($gy + 1) : $gy;
    $days = 355666 + (365 * $gy) + intdiv($gy2 + 3, 4) - intdiv($gy2 + 99, 100) + intdiv($gy2 + 399, 400) + $gd + $g_d_m[$gm - 1];
    $jy = -1595 + (33 * intdiv($days, 12053));
    $days %= 12053;
    $jy += 4 * intdiv($days, 1461);
    $days %= 1461;
    if ($days > 365) {
        $jy += intdiv($days - 1, 365);
        $days = ($days - 1) % 365;
    }
    if ($days < 186) {
        $jm = 1 + intdiv($days, 31);
        $jd = 1 + ($days % 31);
    } else {
        $jm = 7 + intdiv($days - 186, 30);
        $jd = 1 + (($days - 186) % 30);
    }
    return sprintf('%04d/%02d/%02d', $jy, $jm, $jd);
}

function ts_valid_phone(string $phone): bool {
    return (bool) preg_match('/^09\d{9}$/', $phone);
}

function ts_client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP','HTTP_X_FORWARDED_FOR','REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $v = explode(',', $_SERVER[$k])[0];
            return trim($v);
        }
    }
    return '';
}

function ts_read_json_body(): array {
    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function ts_column_exists(PDO $pdo, string $table, string $column): bool {
    try {
        $stmt = $pdo->prepare(
            "SELECT COUNT(*) FROM information_schema.columns
             WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?"
        );
        $stmt->execute([$table, $column]);
        return (bool)$stmt->fetchColumn();
    } catch (Throwable $e) {
        return false;
    }
}

function ts_table_exists(PDO $pdo, string $table): bool {
    try {
        $stmt = $pdo->prepare(
            "SELECT COUNT(*) FROM information_schema.tables
             WHERE table_schema = DATABASE() AND table_name = ?"
        );
        $stmt->execute([$table]);
        return (bool)$stmt->fetchColumn();
    } catch (Throwable $e) {
        return false;
    }
}

function ts_cors_same_origin(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host   = $_SERVER['HTTP_HOST'] ?? '';
    if ($origin && $host && parse_url($origin, PHP_URL_HOST) === $host) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/* ============ Admin auth ============ */

function ts_admin_session_cookie_name(): string { return 'ts_admin'; }

function ts_admin_set_session(int $admin_id): string {
    $token   = bin2hex(random_bytes(32));
    $ttl     = (int)(ts_load_config()['admin_session_ttl'] ?? 604800);
    $expires = date('Y-m-d H:i:s', time() + $ttl);
    $stmt = ts_db()->prepare('INSERT INTO ts_admin_sessions (token, admin_id, expires_at) VALUES (?, ?, ?)');
    $stmt->execute([$token, $admin_id, $expires]);
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    setcookie(ts_admin_session_cookie_name(), $token, [
        'expires'  => time() + $ttl,
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    return $token;
}

function ts_admin_clear_session(): void {
    $name  = ts_admin_session_cookie_name();
    $token = $_COOKIE[$name] ?? '';
    if ($token) {
        $stmt = ts_db()->prepare('DELETE FROM ts_admin_sessions WHERE token = ?');
        $stmt->execute([$token]);
    }
    setcookie($name, '', [
        'expires' => time() - 3600, 'path' => '/',
        'httponly' => true, 'samesite' => 'Lax',
    ]);
}

function ts_admin_current(): ?array {
    $token = $_COOKIE[ts_admin_session_cookie_name()] ?? '';
    if (!$token) return null;
    $stmt = ts_db()->prepare(
        'SELECT a.id, a.username FROM ts_admin_sessions s
         JOIN ts_admins a ON a.id = s.admin_id
         WHERE s.token = ? AND s.expires_at > NOW() LIMIT 1'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function ts_admin_require(): array {
    $a = ts_admin_current();
    if (!$a) ts_json_error(401, 'Unauthorized');
    return $a;
}

/* ============ Card-user auth (separate from admin) ============ */

function ts_carduser_cookie_name(): string { return 'ts_carduser'; }

function ts_carduser_set_session(int $user_id): string {
    $token   = bin2hex(random_bytes(32));
    $ttl     = 60 * 60 * 24 * 30; // 30 days
    $expires = date('Y-m-d H:i:s', time() + $ttl);
    $stmt = ts_db()->prepare('INSERT INTO ts_card_user_sessions (token, card_user_id, expires_at) VALUES (?, ?, ?)');
    $stmt->execute([$token, $user_id, $expires]);
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    setcookie(ts_carduser_cookie_name(), $token, [
        'expires'  => time() + $ttl,
        'path'     => '/',
        'secure'   => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    return $token;
}

function ts_carduser_clear_session(): void {
    $name  = ts_carduser_cookie_name();
    $token = $_COOKIE[$name] ?? '';
    if ($token) {
        $stmt = ts_db()->prepare('DELETE FROM ts_card_user_sessions WHERE token = ?');
        $stmt->execute([$token]);
    }
    setcookie($name, '', [
        'expires' => time() - 3600, 'path' => '/',
        'httponly' => true, 'samesite' => 'Lax',
    ]);
}

function ts_carduser_current(): ?array {
    $token = $_COOKIE[ts_carduser_cookie_name()] ?? '';
    if (!$token) return null;
    $stmt = ts_db()->prepare(
        'SELECT u.id, u.first_name, u.last_name, u.username
         FROM ts_card_user_sessions s
         JOIN ts_card_users u ON u.id = s.card_user_id
         WHERE s.token = ? AND s.expires_at > NOW() LIMIT 1'
    );
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function ts_carduser_require(): array {
    $u = ts_carduser_current();
    if (!$u) ts_json_error(401, 'Unauthorized');
    return $u;
}

/* ============ Card allocation logs ============ */

function ts_card_alloc_log(
    int $card_id,
    ?int $card_user_id,
    string $action,
    ?float $before,
    ?float $after,
    ?string $currency,
    ?string $user_label,
    ?string $note = null
): void {
    try {
        $admin = ts_admin_current();
        $stmt = ts_db()->prepare(
            'INSERT INTO ts_card_alloc_logs
             (card_id, card_user_id, admin_id, admin_username, action,
              before_allocated, after_allocated, currency, user_label, note, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $card_id,
            $card_user_id,
            $admin['id'] ?? null,
            $admin['username'] ?? null,
            $action,
            $before,
            $after,
            $currency,
            $user_label,
            $note,
            date('Y-m-d H:i:s'),
        ]);
    } catch (Throwable $e) {
        // logging never blocks main flow
    }
}

// ============ Treasury (بانک ترخیصان) ============
function ts_treasury_balance(): float {
    try {
        $row = ts_db()->query(
            "SELECT
                COALESCE(SUM(CASE WHEN direction='in'  THEN amount_irt ELSE 0 END),0) -
                COALESCE(SUM(CASE WHEN direction='out' THEN amount_irt ELSE 0 END),0) AS bal,
                COUNT(*) AS n
             FROM ts_treasury_ledger"
        )->fetch();
        if ((int)($row['n'] ?? 0) > 0) return (float)($row['bal'] ?? 0);
        $pdo = ts_db();
        $in = 0.0; $out = 0.0;
        if (ts_table_exists($pdo, 'ts_card_payments')) {
            $toCond = ts_column_exists($pdo, 'ts_card_payments', 'to_treasury') ? 'AND COALESCE(to_treasury,1)=1' : '';
            $r = $pdo->query("SELECT COALESCE(SUM(amount_irt),0) AS s FROM ts_card_payments WHERE status='confirmed' $toCond")->fetch();
            $in = (float)($r['s'] ?? 0);
        }
        if (ts_table_exists($pdo, 'ts_card_admin_payments')) {
            $fromCond = ts_column_exists($pdo, 'ts_card_admin_payments', 'from_treasury') ? 'AND COALESCE(from_treasury,0)=1' : '';
            $r = $pdo->query("SELECT COALESCE(SUM(amount_irt),0) AS s FROM ts_card_admin_payments WHERE status='confirmed' $fromCond")->fetch();
            $out = (float)($r['s'] ?? 0);
        }
        return $in - $out;
    } catch (Throwable $e) { return 0.0; }
}

function ts_treasury_log(
    string $direction,           // 'in' | 'out'
    float $amount_irt,
    ?int $card_id,
    string $source_type,         // 'user_payment' | 'admin_payment' | 'manual_adjust'
    ?int $source_id,
    ?string $note = null,
    ?string $occurred_at = null
): ?int {
    if (!in_array($direction, ['in','out'], true)) return null;
    if ($amount_irt <= 0) return null;
    try {
        ts_ensure_treasury_schema(ts_db());
        $admin = ts_admin_current();
        $occ = $occurred_at ?: date('Y-m-d H:i:s');
        $now = date('Y-m-d H:i:s');
        $stmt = ts_db()->prepare(
            'INSERT INTO ts_treasury_ledger
             (direction, amount_irt, card_id, source_type, source_id, admin_id, note, occurred_at, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $direction, $amount_irt, $card_id, $source_type, $source_id,
            $admin['id'] ?? null, $note, $occ, $now,
        ]);
        return (int)ts_db()->lastInsertId();
    } catch (Throwable $e) {
        return null;
    }
}

function ts_treasury_remove_source(string $source_type, int $source_id): void {
    try {
        ts_db()->prepare('DELETE FROM ts_treasury_ledger WHERE source_type=? AND source_id=?')
            ->execute([$source_type, $source_id]);
    } catch (Throwable $e) {}
}

function ts_ensure_card_admin_payments_schema(PDO $pdo): bool {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS ts_card_admin_payments (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $defs = [
            'admin_id' => 'ADD COLUMN admin_id INT NULL',
            'pay_date_gregorian' => 'ADD COLUMN pay_date_gregorian DATE NULL',
            'pay_date_jalali' => 'ADD COLUMN pay_date_jalali VARCHAR(20) NULL',
            'receipt_path' => 'ADD COLUMN receipt_path VARCHAR(255) NULL',
            'note' => 'ADD COLUMN note VARCHAR(500) NULL',
            'status' => "ADD COLUMN status ENUM('pending','confirmed','rejected') NOT NULL DEFAULT 'confirmed'",
            'from_treasury' => 'ADD COLUMN from_treasury TINYINT(1) NOT NULL DEFAULT 0',
            'created_at' => 'ADD COLUMN created_at DATETIME NULL',
            'updated_at' => 'ADD COLUMN updated_at DATETIME NULL',
        ];
        foreach ($defs as $col => $ddl) {
            if (!ts_column_exists($pdo, 'ts_card_admin_payments', $col)) {
                $pdo->exec("ALTER TABLE ts_card_admin_payments $ddl");
            }
        }
        try { $pdo->exec('ALTER TABLE ts_card_admin_payments ADD INDEX idx_card (card_id)'); } catch (Throwable $e) {}
        try { $pdo->exec('ALTER TABLE ts_card_admin_payments ADD INDEX idx_status (status)'); } catch (Throwable $e) {}
        $pdo->exec('UPDATE ts_card_admin_payments SET created_at = COALESCE(created_at, NOW()), updated_at = COALESCE(updated_at, created_at, NOW()) WHERE created_at IS NULL OR updated_at IS NULL');
        return true;
    } catch (Throwable $e) {
        return false;
    }
}

/**
 * Ensures ts_cards has the tolerance + display-balance columns used for
 * per-section tolerance and the "اتمام" (finalize) snapshot.
 */
function ts_ensure_cards_tolerance_schema(PDO $pdo): bool {
    try {
        if (!ts_column_exists($pdo, 'ts_cards', 'tolerance_percent')) {
            $pdo->exec("ALTER TABLE ts_cards ADD COLUMN tolerance_percent DECIMAL(6,3) NOT NULL DEFAULT 0");
        }
        if (!ts_column_exists($pdo, 'ts_cards', 'display_balance_usd')) {
            $pdo->exec("ALTER TABLE ts_cards ADD COLUMN display_balance_usd DECIMAL(18,2) NULL");
        }
        if (!ts_column_exists($pdo, 'ts_cards', 'finalized_at')) {
            $pdo->exec("ALTER TABLE ts_cards ADD COLUMN finalized_at DATETIME NULL");
        }
        return true;
    } catch (Throwable $e) {
        return false;
    }
}

function ts_ensure_treasury_schema(PDO $pdo): bool {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS ts_treasury_ledger (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
        return true;
    } catch (Throwable $e) {
        return false;
    }
}

/**
 * Idempotent backfill of ts_treasury_ledger from real confirmed payments.
 * Returns number of rows newly inserted.
 */
function ts_treasury_backfill(PDO $pdo): int {
    if (!ts_table_exists($pdo, 'ts_treasury_ledger')) {
        ts_ensure_treasury_schema($pdo);
    }
    if (!ts_table_exists($pdo, 'ts_treasury_ledger')) return 0;
    $inserted = 0;
    try {
        if (ts_table_exists($pdo, 'ts_card_payments')) {
            $hasToTreasury = ts_column_exists($pdo, 'ts_card_payments', 'to_treasury');
            $toCond = $hasToTreasury ? "AND COALESCE(p.to_treasury,1)=1" : "";
            $deleteCond = $hasToTreasury ? "OR COALESCE(p.to_treasury,1)<>1" : "";
            $pdo->exec(
                "DELETE l FROM ts_treasury_ledger l
                 JOIN ts_card_payments p ON p.id=l.source_id
                 WHERE l.source_type='user_payment'
                   AND (p.status<>'confirmed' $deleteCond)"
            );
            $pdo->exec(
                "UPDATE ts_treasury_ledger l
                 JOIN ts_card_payments p ON p.id=l.source_id
                 SET l.direction='in',
                     l.amount_irt=COALESCE(p.amount_irt,0),
                     l.card_id=p.card_id,
                     l.occurred_at=COALESCE(NULLIF(p.created_at,'0000-00-00 00:00:00'), l.occurred_at, NOW())
                 WHERE l.source_type='user_payment'
                   AND p.status='confirmed' $toCond"
            );
            $inserted += (int)$pdo->exec(
                "INSERT INTO ts_treasury_ledger
                   (direction, amount_irt, card_id, source_type, source_id, note, occurred_at, created_at)
                 SELECT 'in', COALESCE(p.amount_irt,0), p.card_id, 'user_payment', p.id,
                        CONCAT('Backfill — پرداخت کاربر #', p.card_user_id),
                         COALESCE(NULLIF(p.created_at,'0000-00-00 00:00:00'), NOW()), NOW()
                 FROM ts_card_payments p
                 WHERE p.status='confirmed' $toCond
                   AND COALESCE(p.amount_irt,0)>0
                   AND NOT EXISTS (
                     SELECT 1 FROM ts_treasury_ledger l
                     WHERE l.source_type='user_payment' AND l.source_id=p.id
                   )"
            );
        }
        if (ts_table_exists($pdo, 'ts_card_admin_payments')) {
            $hasFromTreasury = ts_column_exists($pdo, 'ts_card_admin_payments', 'from_treasury');
            $fromCond = $hasFromTreasury ? "AND COALESCE(ap.from_treasury,0)=1" : "";
            $deleteCond = $hasFromTreasury ? "OR COALESCE(ap.from_treasury,0)<>1" : "";
            $occCol = ts_column_exists($pdo, 'ts_card_admin_payments', 'pay_date_gregorian')
                      ? "COALESCE(NULLIF(CONCAT(ap.pay_date_gregorian,' 00:00:00'),'0000-00-00 00:00:00'), NULLIF(ap.created_at,'0000-00-00 00:00:00'), NOW())"
                      : "COALESCE(NULLIF(ap.created_at,'0000-00-00 00:00:00'), NOW())";
            $adminCol = ts_column_exists($pdo, 'ts_card_admin_payments', 'admin_id') ? "ap.admin_id" : "NULL";
            $pdo->exec(
                "DELETE l FROM ts_treasury_ledger l
                 JOIN ts_card_admin_payments ap ON ap.id=l.source_id
                 WHERE l.source_type='admin_payment'
                   AND (ap.status<>'confirmed' $deleteCond)"
            );
            $pdo->exec(
                "UPDATE ts_treasury_ledger l
                 JOIN ts_card_admin_payments ap ON ap.id=l.source_id
                 SET l.direction='out',
                     l.amount_irt=COALESCE(ap.amount_irt,0),
                     l.card_id=ap.card_id,
                     l.admin_id=$adminCol,
                     l.occurred_at=$occCol
                 WHERE l.source_type='admin_payment'
                   AND ap.status='confirmed' $fromCond"
            );
            $inserted += (int)$pdo->exec(
                "INSERT INTO ts_treasury_ledger
                   (direction, amount_irt, card_id, source_type, source_id, admin_id, note, occurred_at, created_at)
                 SELECT 'out', COALESCE(ap.amount_irt,0), ap.card_id, 'admin_payment', ap.id, $adminCol,
                        'Backfill — پرداخت بدهی کارت',
                        $occCol, NOW()
                 FROM ts_card_admin_payments ap
                 WHERE ap.status='confirmed' $fromCond
                   AND COALESCE(ap.amount_irt,0)>0
                   AND NOT EXISTS (
                     SELECT 1 FROM ts_treasury_ledger l
                     WHERE l.source_type='admin_payment' AND l.source_id=ap.id
                   )"
            );
        }
    } catch (Throwable $e) { /* silent */ }
    return $inserted;
}


