import { Schema, model, models, Document } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string; // Add phoneNumber to the interface
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true } // Add phoneNumber to the schema
}, { timestamps: true });

const userModel = models.User || model<IUser>('User', userSchema);

export default userModel;
