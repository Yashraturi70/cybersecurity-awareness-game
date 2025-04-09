const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    // Generate a secure random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update admin password
    await connection.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, 'admin@cybersecurity.com']
    );

    console.log('Admin setup completed successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@cybersecurity.com');
    console.log(`Password: ${password}`);
    console.log('\nIMPORTANT: Please change this password immediately after first login!');
  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await connection.end();
  }
}

setupAdmin(); 