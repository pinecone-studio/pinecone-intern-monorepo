import { User } from "src/models"

export const getUsers = async () => {
    const users = await User.find();
    console.log("Fetched users:", users);
    return users;
}
