import { model } from "mongoose";
import userSchema from "../schemas/userSchema";

export const User = model("User", userSchema, "users");
