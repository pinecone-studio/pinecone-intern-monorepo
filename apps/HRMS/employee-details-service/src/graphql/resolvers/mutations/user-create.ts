import { UserModel } from "@/graphql/model/user";

export const createUser = async (_: any, { name }: any) => {
  console.log(name);
  return await UserModel.create({ name });
};
