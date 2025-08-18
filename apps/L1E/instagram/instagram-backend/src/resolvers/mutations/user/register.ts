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
    console.log("Register resolver called with input:", input);
    validateRegisterInput(input); // narrowing хийсэн тул дараа нь `as string` хэрэггүй
    const { email, password, userName, fullName } = input;
    console.log("Validated input - email:", email, "userName:", userName, "fullName:", fullName);

    await checkEmailExists(email, "Sorry try another email!");
    console.log("Email check passed");
    
    const hashed = await hashPassword(password);
    console.log("Password hashed successfully");

    const user = await User.create({
      email,
      password: hashed,
      userName,
      fullName,
    });
    console.log("User created with ID:", user._id);

    const token = jwt.sign({ userId: user._id }, getJwtSecret());
    console.log("JWT token created");

    const result = {
      success: true,
      message: "Registration successful",
      user,
      token,
    };
    console.log("Returning result:", result);
    return result;
  } catch (error) {
    console.error("Register resolver error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Registration failed");
  }
};
