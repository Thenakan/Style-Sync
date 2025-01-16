import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;

  // Return early if the connection is already open or connecting
  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("MongoDB connection is in progress");
    return;
  }

  // Try to connect to MongoDB
  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: '',  // Ensure the database name is correct
      bufferCommands: true, // Buffer commands while connecting
    });

    console.log("MongoDB connected successfully");
  } catch (error: any) {
    console.log("MongoDB connection error:", error.message);
    throw new Error("MongoDB connection failed");
  }
 
};

export default dbConnect;
