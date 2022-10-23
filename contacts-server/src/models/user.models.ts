import mongoose from "mongoose";
import { User } from "../types";

const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

export default User