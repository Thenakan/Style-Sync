import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async (): Promise<void> => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("MongoDB is already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("MongoDB connection is in progress");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "", 
      bufferCommands: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.log("MongoDB connection error:", error.message);
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }
    throw new Error("MongoDB connection failed due to an unknown error");
  }
};

export default dbConnect;
