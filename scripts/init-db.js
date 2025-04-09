const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  // First connect without database to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    console.log('Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database '${process.env.DB_NAME}' created successfully!`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table
    console.log('\nCreating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created successfully!');

    // Create user_scores table
    console.log('\nCreating user_scores table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        test_id INT NOT NULL,
        score INT NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('User_scores table created successfully!');

    // Create indexes
    console.log('\nCreating indexes...');
    try {
      await connection.query('CREATE INDEX idx_user_email ON users(email)');
    } catch (e) {
      if (!e.message.includes('Duplicate key name')) {
        throw e;
      }
    }
    
    try {
      await connection.query('CREATE INDEX idx_user_scores_user_id ON user_scores(user_id)');
    } catch (e) {
      if (!e.message.includes('Duplicate key name')) {
        throw e;
      }
    }
    
    try {
      await connection.query('CREATE INDEX idx_user_scores_test_id ON user_scores(test_id)');
    } catch (e) {
      if (!e.message.includes('Duplicate key name')) {
        throw e;
      }
    }
    console.log('Indexes created successfully!');

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase(); 