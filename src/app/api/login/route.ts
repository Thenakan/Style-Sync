// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import { login, LoginInput } from '../models/login';

export async function POST(req: Request) {
  const { email, password }: LoginInput = await req.json();

  try {
    const user = await login({ email, password });

    // Return the user data (you can also send a JWT token here)
    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
