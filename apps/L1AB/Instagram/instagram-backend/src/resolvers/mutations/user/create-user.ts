import { MutationResolvers } from "../../../generated";
import { userModel } from "../../../models";

export const createUser: MutationResolvers["createUser"] = async (_: unknown,{input}) => {
    const response = await userModel.create(input);
    return response.toObject();
};