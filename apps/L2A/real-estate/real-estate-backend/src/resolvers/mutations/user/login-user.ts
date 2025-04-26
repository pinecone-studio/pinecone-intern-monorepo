import { USER_MODEL } from "../../../models/user";
import { generateToken } from "../../../utils/jwt";
import bcrypt from "bcryptjs"

export const loginUser = async (_: any, { email, password }: any) => {
  const user = await USER_MODEL.findOne({ email });
  if (!user) throw new Error('user not found');

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword) throw new Error ('Password incorrect')


  const token = generateToken({ id: user._id.toString(), email:user.email });

  return {
    user:{
      id:user._id.toString(),
      email:user.email
    },
    token,
  };
};  
