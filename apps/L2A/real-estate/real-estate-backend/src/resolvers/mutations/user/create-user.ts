import { MutationCreateUserArgs } from "../../../generated";
import { USER_MODEL } from "../../../models/user";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/jwt";

export const createUser = async (_: any, args: MutationCreateUserArgs) => {
  const { email, password } = args; 

  const existingUser = await USER_MODEL.findOne({ email });
  if (existingUser) throw new Error('user already exist');

  const salt = bcrypt.genSaltSync(6);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await USER_MODEL.create({
    email,
    password: hashedPassword,
  });

  const token = generateToken({
    id: newUser._id.toString(),
    email: newUser.email,
  });

  return {
    user: {
      id: newUser._id.toString(),
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
    token,
  };
};
