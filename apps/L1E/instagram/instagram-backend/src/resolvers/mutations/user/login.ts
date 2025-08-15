import { User } from "src/models";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "src/generated";
import bcrypt from "bcryptjs";
import { getJwtSecret } from "src/utils/check-jwt";

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

export const login: MutationResolvers["login"] = async (_, { input }) => {
  try {
    validateLoginInput(input);
    const { email, password } = input;

    const user = await findUserAndCheckPassword(email, password);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = createJwtToken(user._id);

    return {
      success: true,
      message: "Login successful",
      user,
      token,
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Login failed");
  }
};
