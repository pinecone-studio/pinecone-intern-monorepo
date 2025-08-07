import { MutationResolvers } from "src/generated";
import { User } from "src/models";
import { checkEmailExists } from "src/utils/email-exist";
import { hashPassword } from "src/utils/hash";
import jwt from 'jsonwebtoken'

function validateInput(input: {
  email?: string;
  password?: string;
  userName?: string;
  fullName?: string;
}) {
  const { email, password, userName, fullName } = input;
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!userName) throw new Error("Username is required");
  if (!fullName) throw new Error("Full name is required");
}

function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  return process.env.JWT_SECRET;
}

export const register: MutationResolvers['register'] = async (_, { input }) => {
  try {
    validateInput(input);
    const { email, password, userName, fullName } = input;

    await checkEmailExists(email as string, "Sorry try another email!");
    const hashed = await hashPassword(password as string);

    const user = await User.create({
      data: {
        email,
        password: hashed,
        userName,
        fullName,
      },
    });

    const token = jwt.sign({ userId: user._id }, getJwtSecret());

    return {
      user,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Registration failed");
  }
};
