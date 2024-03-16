import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document{
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  onboarded: boolean;
}

const UserSchema = new Schema({
  _id: { type: String, required: true, unique: true},
  email: { type: String, required: true , unique: true },
  username: { type: String, required: true, unique: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  onboarded: {type: Boolean, required: true}
})

const User = models.User || model('User', UserSchema);

export default User;