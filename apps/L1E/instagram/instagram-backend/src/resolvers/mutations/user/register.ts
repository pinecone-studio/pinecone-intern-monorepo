import { MutationResolvers } from "src/generated";
import { User } from "src/models";
import { checkEmailExists } from "src/utils/email-exist";
import { hashPassword } from "src/utils/hash";
import jwt from 'jsonwebtoken';
import { getJwtSecret } from "src/utils/check-jwt";
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
  const requiredFields: { [key: string]: string } = {
    email: "Email is required",
    password: "Password is required",
    userName: "Username is required",
    fullName: "Full name is required",
  };

  for (const key in requiredFields) {
    if (!input[key as keyof typeof input]) {
      throw new Error(requiredFields[key]);
    }
  }
}

// JWT_SECRET авах


export const register: MutationResolvers['register'] = async (_, { input }) => {
  try {
    validateRegisterInput(input); // narrowing хийсэн тул дараа нь `as string` хэрэггүй
    const { email, password, userName, fullName } = input;

    await checkEmailExists(email, "Sorry try another email!");
    const hashed = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashed,
      userName,
      fullName,
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
