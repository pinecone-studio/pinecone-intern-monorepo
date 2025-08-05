import { userModel } from "src/models"

export const getUsers = async () => {
    const users = userModel.find();
    return users;
}
