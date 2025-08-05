import { userModel } from "src/models"

export const getUsers = async () => {
    const users = await userModel.find();
    return users;
}
