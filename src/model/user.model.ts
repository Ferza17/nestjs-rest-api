import mongoose, { Schema, model } from 'mongoose';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserQuery = mongoose.model('User', userSchema);
export const UserCommand = model<IUser>('User', userSchema);
