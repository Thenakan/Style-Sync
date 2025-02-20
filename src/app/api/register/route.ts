import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/db';
import userModel from '../models/UserRegister';

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Route for user registration
export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, phoneNumber } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Check if the phone number already exists in the database
    const existingPhoneNumber = await userModel.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return NextResponse.json({ message: 'Phone number already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with default role as "user"
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: "user" // Default role is "user"
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role }, // Include role in token
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration (1 hour)
    );

    // Send success response with the token
    return NextResponse.json(
      { message: 'User registered successfully', token, role: newUser.role },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Something went wrong', error: errorMessage }, { status: 500 });
  }
}
