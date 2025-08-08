import { User } from "src/models";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "src/generated";
import bcrypt from "bcrypt";
import { getJwtSecret } from "src/utils/check-jwt";

// Input шалгах + narrowing (refactored to lower complexity)
function validateLoginInput(input: {
  email?: string;
  password?: string;
}): asserts input is {
  email: string;
  password: string;
} {
  const requiredFields: { [K in keyof typeof input]: string } = {
    email: "Email is required",
    password: "Password is required",
  };

  for (const key in requiredFields) {
    if (!input[key as keyof typeof input]) {
      throw new Error(requiredFields[key as keyof typeof requiredFields]);
    }
  }
}

// Login mutation
export const login: MutationResolvers["login"] = async (_, { input }) => {
  try {
    validateLoginInput(input); // narrowing хийгдсэн
    const { email, password } = input;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, getJwtSecret());

    return {
      user,
      token,
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Login failed");
  }
};
