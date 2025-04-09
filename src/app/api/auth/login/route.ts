import { NextResponse } from 'next/server';
import { UserModel } from 'src/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    console.log('Login route called');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Received login request for email:', body.email);
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      console.log('Missing required fields:', { email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) {
        console.log('User not found for email:', email);
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      console.log('User found:', { id: user.id, email: user.email, username: user.username });

      // Verify password
      const isValidPassword = await UserModel.verifyPassword(user, password);
      console.log('Password verification result:', isValidPassword);
      
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      console.log('Using JWT secret:', jwtSecret.substring(0, 3) + '...');
      
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '1d' }
      );

      console.log('Login successful, returning token and user data');
      
      return NextResponse.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error', details: dbError instanceof Error ? dbError.message : 'Unknown error' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 