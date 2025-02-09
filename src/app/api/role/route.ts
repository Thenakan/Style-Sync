import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import User from '../models/UserRegister';

export async function PATCH(req: Request) {
  try {
    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { message: 'Both "id" and "role" are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // 🔍 Log BEFORE updating
    const userBefore = await User.findById(id);
    console.log("Before Update:", userBefore);

    if (!userBefore) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // ✅ Update user role and return updated document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    // 🔍 Log AFTER updating
    console.log("After Update:", updatedUser);

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User update failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Role updated successfully', user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { message: 'An error occurred while updating the role' },
      { status: 500 }
    );
  }
}
