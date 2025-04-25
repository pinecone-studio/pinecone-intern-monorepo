import { USER_MODEL } from "../../../models/user";
import { generateToken } from "../../../utils/jwt";

export const loginUser = async (_: any, { email }: any) => {
  const user = await USER_MODEL.findOne({ email });
  if (!user) throw new Error('user not found');

  const token = generateToken({ id: user._id.toString(), email:user.email });

  return {
    token,
  };
};
