# Cybersecurity Awareness Game

A web application for cybersecurity awareness training and testing.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=cybersecurity_awareness
   JWT_SECRET=your_jwt_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Setup

1. Create a MySQL database
2. Run the SQL script in `database.sql` to set up the tables
3. Run the `setup_admin.sql` script to create the admin user
4. Run `npm run setup` to set a secure password for the admin user

## Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. In Vercel dashboard, add these environment variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=cybersecurity_awareness
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   ```
4. Make sure your database allows connections from Vercel's IP addresses
5. Enable SSL for the database connection in production

## Important Notes

- Never commit your `.env` file to version control
- Keep your database credentials and JWT secret secure
- Use SSL for database connections in production
- Regularly backup your database
- The admin credentials will be shown in the console after running the setup script
