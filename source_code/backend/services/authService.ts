import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel";

const JWT_SECRET = "your_secret_key"; // Put in .env file in real projects

export const registerUser = async (username: string, email: string, password: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser(username, email, hashedPassword);
  return { id: newUser.id, username: newUser.username, email: newUser.email };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};
