USE cybersecurity_awareness;

-- Insert admin user (password will be hashed by the application)
INSERT INTO users (username, email, password, created_at)
VALUES (
    'admin',
    'admin@cybersecurity.com',
    '$2a$10$8K1p/a0dL1LXMIgZ5n0p.0e0.0e0.0e0.0e0.0e0.0e0.0e0.0e0', -- This is a placeholder, will be updated
    NOW()
);

-- Note: After running this script, you'll need to update the admin password through the application
-- The initial password should be changed immediately after first login 