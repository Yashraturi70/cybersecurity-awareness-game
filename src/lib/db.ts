import mysql from 'mysql2/promise';

const getDbConfig = () => {
  // For production (Vercel)
  if (process.env.NODE_ENV === 'production') {
    const config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: false
      }
    };
    console.log('Using production DB config:', { 
      host: config.host,
      user: config.user,
      database: config.database
    });
    return config;
  }

  // For local development
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cybersecurity_awareness',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  
  console.log('Using development DB config:', { 
    host: config.host,
    user: config.user,
    database: config.database
  });
  
  return config;
};

// Create a mock pool for error cases
const mockPool: any = {
  execute: async () => {
    throw new Error('Database connection failed. Check your environment variables and database server.');
  }
};

// Initialize the pool with either a real connection or the mock
let pool;

try {
  pool = mysql.createPool(getDbConfig());
  
  // Test the connection
  pool.on('connection', () => {
    console.log('DB connection established');
  });
  
  pool.on('error', (err) => {
    console.error('Database pool error:', err);
  });
  
  // Execute a simple query to test the connection
  (async () => {
    try {
      const [result] = await pool.execute('SELECT 1 as test');
      console.log('DB connection test successful:', result);
    } catch (err) {
      console.error('DB connection test failed:', err);
    }
  })();
} catch (err) {
  console.error('Failed to create database pool:', err);
  // Use the mock pool if creation failed
  pool = mockPool;
}

export default pool; 