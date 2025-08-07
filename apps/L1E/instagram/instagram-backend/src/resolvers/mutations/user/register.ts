import { MutationResolvers } from "src/generated";
import { User } from "src/models";
import { checkEmailExists } from "src/utils/email-exist";
import { hashPassword } from "src/utils/hash";
import jwt from 'jsonwebtoken';

// Input шалгах (asserts ашиглаж narrowing хийх)
function validateRegisterInput(input: {
  email?: string;
  password?: string;
  userName?: string;
  fullName?: string;
}): asserts input is {
  email: string;
  password: string;
  userName: string;
  fullName: string;
} {
  const { email, password, userName, fullName } = input;
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (!userName) throw new Error("Username is required");
  if (!fullName) throw new Error("Full name is required");
}

// JWT_SECRET авах
function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  return process.env.JWT_SECRET;
}

export const register: MutationResolvers['register'] = async (_, { input }) => {
  try {
    validateRegisterInput(input); // narrowing хийсэн тул дараа нь `as string` хэрэггүй
    const { email, password, userName, fullName } = input;

    await checkEmailExists(email, "Sorry try another email!");
    const hashed = await hashPassword(password);

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
    if (error instanceof Error) throw error;
    throw new Error("Registration failed");
  }
};
