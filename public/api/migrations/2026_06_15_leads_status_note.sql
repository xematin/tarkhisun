ALTER TABLE ts_leads
  ADD COLUMN note VARCHAR(500) NULL AFTER ip,
  ADD COLUMN status ENUM('new','contacted','done','rejected') NOT NULL DEFAULT 'new' AFTER note;

ALTER TABLE ts_leads ADD INDEX idx_status (status);
