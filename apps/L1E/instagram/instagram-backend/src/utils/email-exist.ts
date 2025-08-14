import { User } from "src/models"

export const checkEmailExists = async (email: string, error: string) => {
    const isExist = await User.findOne({email});
    if(isExist) { 
        throw new Error (error)
    }
}