import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/auth';

// Temporary mock user for testing the transition
const MOCK_USER = {
  id: 'u1',
  email: 'musa@3mtt.com',
  password: 'password123',
  name: 'Musa Ibrahim'
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      await login({
        id: MOCK_USER.id,
        email: MOCK_USER.email,
        name: MOCK_USER.name,
      });

      return NextResponse.json({ message: 'Login successful', user: { email: MOCK_USER.email, name: MOCK_USER.name } });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
