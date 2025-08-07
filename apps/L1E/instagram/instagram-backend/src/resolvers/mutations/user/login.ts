import { User } from "src/models";
import jwt from 'jsonwebtoken';
import { MutationResolvers } from "src/generated";
import bcrypt from 'bcrypt';

// Input шалгах + narrowing хийж өгнө
function validateLoginInput(input: {
  email?: string;
  password?: string;
}): asserts input is {
  email: string;
  password: string;
} {
  if (!input.email) throw new Error("Email is required");
  if (!input.password) throw new Error("Password is required");
}

// JWT_SECRET авах (null-check + return string)
function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  return process.env.JWT_SECRET;
}

export const login: MutationResolvers['login'] = async (_, { input }) => {
  try {
    validateLoginInput(input); // narrowing хийж байна
    const { email, password } = input;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, getJwtSecret());

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
