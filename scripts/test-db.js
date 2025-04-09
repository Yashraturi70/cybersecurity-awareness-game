const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    console.log('Testing database connection...');
    await connection.connect();
    console.log('✅ Database connection successful!');

    // Test if tables exist
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\nTables in database:');
    tables.forEach(table => {
      console.log(`- ${table.Tables_in_cybersecurity_awareness}`);
    });

    // Test users table
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log(`\nTotal users: ${users[0].count}`);

  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await connection.end();
  }
}

testConnection(); 