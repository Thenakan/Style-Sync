import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import { User } from '../models/admin';

export async function GET(_req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users, ensure all fields are selected
    const users = await User.find({}, 'firstName lastName email phoneNumber');

    console.log("Fetched users:", users); // Log to check the data structure

    // Format the response to include all necessary fields
    const formattedUsers = users.map((user: any) => ({
      _id: user._id,
      firstName: user.firstName || "", // Ensure firstName is available
      lastName: user.lastName || "",   // Ensure lastName is available
      email: user.email || "",         // Ensure email is available
      phoneNumber: user.phoneNumber || "", // Ensure phoneNumber is available
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}


