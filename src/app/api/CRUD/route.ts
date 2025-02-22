import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/db";
import User from "../models/UserRegister";

// Handle GET requests (Fetch all users)
export const GET = async () => {
  try {
    await connectToDatabase();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching users:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch users.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
  }
};

// Handle POST requests (Add a new user)
export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const newUser = await req.json();
    console.log("User to save:", newUser);
    const savedUser = await User.create(newUser);
    return NextResponse.json(
      { message: "User saved successfully", savedUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving user:", error.message);
      return NextResponse.json(
        { message: "Failed to save user.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
  }
};

// Handle GET requests for a single user (Fetch a user by ID)
// export const GET_BY_ID = async (req: NextRequest) => {
//   try {
//     await connectToDatabase();
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (!id) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//     }
//     const user = await User.findById(id);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json(user, { status: 200 });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error fetching user:", error.message);
//       return NextResponse.json(
//         { message: "Failed to fetch user.", error: error.message },
//         { status: 500 }
//       );
//     }
//     return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
//   }
// };

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating user:", error.message);
      return NextResponse.json(
        { message: "Failed to update user.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
  }
};

// Handle DELETE requests (Delete a user)
export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDatabase();
    const { id }: { id: string } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
      return NextResponse.json(
        { message: "Failed to delete user.", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
  }
};
