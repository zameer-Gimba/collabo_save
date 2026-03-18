import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // In a real app, you would create the user in your database (e.g., Firestore)
    // For now, we simulate a successful signup
    await login({
      id: Math.random().toString(36).substring(7),
      email,
      name,
    });

    return NextResponse.json({ message: 'User created successfully', user: { email, name } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
