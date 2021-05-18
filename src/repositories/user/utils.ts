import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const encrypt = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

// we gonna use user._id as token payload
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "10min" });
};
