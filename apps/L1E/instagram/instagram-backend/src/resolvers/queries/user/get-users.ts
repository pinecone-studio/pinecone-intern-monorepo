import { User } from "src/models"

export const getUsers = async () => {
    const users = await User.find();
    return users;
}
