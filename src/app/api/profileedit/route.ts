import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/db"; // Ensure the correct path
import User from "../models/UserRegister"; // Ensure the correct path

// Handle PATCH requests (Update a user)
export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const updateData = await req.json();
    console.log("User to update:", updateData);

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = (error as any).message;
    console.error("Error updating user:", errorMessage);
    return NextResponse.json(
      { message: "Failed to update user.", error: errorMessage },
      { status: 500 }
    );
  }
};