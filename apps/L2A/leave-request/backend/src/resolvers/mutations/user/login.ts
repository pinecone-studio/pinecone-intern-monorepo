

import { User } from "../../../models/models";
import { generateAccessToken, generateRefreshToken } from "../../../utils/token";

// login.ts
export const login = async (userArgs: { email: string; password: string }) => {
    const { email, password } = userArgs;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
  
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
  
    return { accessToken, refreshToken, user };
  };
  

