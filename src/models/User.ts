import bcrypt from 'bcryptjs';
import pool from '../lib/db';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
}

export interface UserScore {
  user_id: number;
  test_id: number;
  score: number;
  completed_at: Date;
}

export class UserModel {
  static async create(user: User): Promise<number> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [user.username, user.email, hashedPassword]
    );
    return (result as any).insertId;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return (rows as User[])[0] || null;
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  static async saveScore(score: UserScore): Promise<void> {
    await pool.execute(
      'INSERT INTO user_scores (user_id, test_id, score, completed_at) VALUES (?, ?, ?, ?)',
      [score.user_id, score.test_id, score.score, score.completed_at]
    );
  }

  static async getUserScores(userId: number): Promise<UserScore[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM user_scores WHERE user_id = ?',
      [userId]
    );
    return rows as UserScore[];
  }
} 