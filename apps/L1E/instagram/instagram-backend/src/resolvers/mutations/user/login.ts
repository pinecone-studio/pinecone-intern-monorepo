import { User } from "src/models";
import jwt from 'jsonwebtoken';
import { MutationResolvers } from "src/generated";
import bcrypt from 'bcrypt';

// Тусдаа input шалгах функц
function validateLoginInput(email?: string, password?: string) {
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
}

// JWT_SECRET шалгах функц
function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  return process.env.JWT_SECRET;
}

export const login: MutationResolvers['login'] = async (_, { input }) => {
  try {
    const { email, password } = input;
    validateLoginInput(email, password);

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = bcrypt.compareSync(password as string, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user._id },
      getJwtSecret()
    );

    return {
      user,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Login failed");
  }
};
