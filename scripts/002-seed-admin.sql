-- Seed admin user with bcrypt hashed password for 'Semarang20?'
-- The hash is generated using bcrypt with 10 rounds
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeXxvhpKqZBj3mJhXqKp8T0TKXV6jYKG')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;
