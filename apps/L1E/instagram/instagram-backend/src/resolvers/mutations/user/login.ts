import { User } from "../../../models";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "../../../generated";
import bcrypt from "bcryptjs";
import { getJwtSecret } from "../../../utils/check-jwt";

// Input шалгах + narrowing
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

async function findUserAndCheckPassword(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) return null;
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return null;
  return user;
}

function createJwtToken(userId: string) {
  return jwt.sign({ userId }, getJwtSecret());
}

function createLoginResult(user: any, token: string) {
  return {
    success: true,
    message: "Login successful",
    user,
    token,
  };
}

async function performLogin(email: string, password: string) {
  console.log("Validated input - email:", email, "password length:", password.length);

  const user = await findUserAndCheckPassword(email, password);
  console.log("User found:", user ? "yes" : "no");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = createJwtToken(user._id);
  console.log("JWT token created, user ID:", user._id);

  const result = createLoginResult(user, token);
  console.log("Returning result:", result);
  return result;
}

export const login: MutationResolvers["login"] = async (_, { input }) => {
  try {
    console.log("Login resolver called with input:", input);
    validateLoginInput(input);
    const { email, password } = input;
    return await performLogin(email, password);
  } catch (error) {
    console.error("Login resolver error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Login failed");
  }
};
