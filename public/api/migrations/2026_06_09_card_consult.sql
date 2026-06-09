CREATE TABLE IF NOT EXISTS ts_card_consult (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
