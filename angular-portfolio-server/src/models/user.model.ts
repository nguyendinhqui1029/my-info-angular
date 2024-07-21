import mongoose, { Schema, Document } from 'mongoose';

// Define interface for TypeScript type-checking
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define Mongoose schema for User model
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Define and export the User model based on schema
const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;