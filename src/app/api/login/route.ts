import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db'; // Import dbConnect
import bcrypt from 'bcrypt';
import { LoginInput } from '../models/login';
import User from '../models/UserRegister'; // Assuming you have a Mongoose User model

export async function POST(req: Request) {
  const { email, password }: LoginInput = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Connect to the database using dbConnect
    await dbConnect();

    // Find the user by email using the Mongoose User model
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    // If login is successful, return user data (you can also send a JWT token)
    return NextResponse.json({ message: 'Login successful', user }, { status: 200 });

  } catch (error: unknown) {  // Use 'unknown' instead of 'any'
    console.error(error);  // Log the error for debugging
    return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
  }
}
