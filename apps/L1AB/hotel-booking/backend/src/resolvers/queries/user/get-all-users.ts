import { QueryResolvers } from "../../../generated";
import { userModel } from "../../../models";

export const getAllUsers: QueryResolvers["getAllUsers"] = async () => {
    try {
        const users = await userModel.find()
        return users
    } catch (error) {
        throw new Error("Failed to get all users")
    }
}