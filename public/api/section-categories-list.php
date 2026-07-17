<?php
declare(strict_types=1);
require __DIR__ . '/db.php';
ts_cors_same_origin();

$pdo = ts_db();

// Auto-create table on first hit
try {
    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS ts_section_categories (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL UNIQUE,
            sort_order INT NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) DEFAULT CHARSET=utf8mb4"
    );
    // Seed defaults once if empty
    $c = (int)$pdo->query("SELECT COUNT(*) FROM ts_section_categories")->fetchColumn();
    if ($c === 0) {
        $seed = ['تره بار','خشکبار','کامپاند گرانول','کامپاند','گرانول','آهن','آبزیان','متفرقه'];
        $ins = $pdo->prepare("INSERT IGNORE INTO ts_section_categories (name, sort_order) VALUES (?, ?)");
        foreach ($seed as $i => $n) $ins->execute([$n, $i]);
    }
} catch (Throwable $e) {
    ts_json(200, ['items' => []]);
}

try {
    $rows = $pdo->query("SELECT id, name FROM ts_section_categories ORDER BY sort_order ASC, id ASC")->fetchAll();
} catch (Throwable $e) {
    $rows = [];
}
ts_json(200, ['items' => $rows]);
