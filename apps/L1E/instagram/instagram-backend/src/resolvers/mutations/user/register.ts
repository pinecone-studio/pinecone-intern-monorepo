import { MutationResolvers } from "src/generated";
import { User } from "src/models";
import { checkEmailExists } from "src/utils/email-exist";
import { hashPassword } from "src/utils/hash";
import jwt from 'jsonwebtoken'

export const register:MutationResolvers['register'] = async (_,{input}) => {
 try {
  const { email, password, userName, fullName } = input;

  if (!email) {
    throw new Error("Email is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }
  if (!userName) {
    throw new Error("Username is required");
  }
  if (!fullName) {
    throw new Error("Full name is required");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  await checkEmailExists(email, "Sorry try another email!");
  const hashed = await hashPassword(password);

  const user = await User.create({
    data: {
        email,
        password: hashed,
        userName,
        fullName
      },
    });
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET!
    )
    return {
      user: user,
      token: token
    };
 } catch (error) {
  if(error instanceof Error) { 
    throw error;
  }
  throw new Error ("Registration failed")
 }
}