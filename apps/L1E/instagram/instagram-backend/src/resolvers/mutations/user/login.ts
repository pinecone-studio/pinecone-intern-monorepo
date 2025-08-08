import { User } from "src/models";
import jwt from 'jsonwebtoken';
import { MutationResolvers } from "src/generated";
import bcrypt from 'bcrypt';
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

export const login: MutationResolvers['login'] = async (_, { input }) => {
  try {
    validateLoginInput(input);
    const { email, password } = input;

    const user = await User.findOne({ email });
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, getJwtSecret());

    return {
      user,
      token,
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Login failed");
  }
};
