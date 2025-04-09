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

## Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. In Vercel dashboard, add the following environment variables:
   - `DB_HOST`: Your database host
   - `DB_USER`: Your database username
   - `DB_PASSWORD`: Your database password
   - `DB_NAME`: Your database name
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: Set to "production"

## Important Notes

- Never commit your `.env` file to version control
- Keep your database credentials and JWT secret secure
- Use SSL for database connections in production
- Regularly backup your database
