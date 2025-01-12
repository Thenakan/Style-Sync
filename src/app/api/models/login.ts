// models/loginModel.ts
import bcrypt from 'bcryptjs'; // To hash and compare passwords
import User from '../models/UserRegister'; // Assuming you're using a User model (for example MongoDB)

export interface LoginInput {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginInput) {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect Password');
  }

  // If successful, return the user data (or a token if needed)
  return user;
}
