import { User } from "src/models";
import jwt from 'jsonwebtoken'
import { MutationResolvers } from "src/generated";
import bcrypt from 'bcrypt'
export const login:MutationResolvers['login'] = async (_,{input}) => {
    try {
        const {email,password} = input;
    if(!email) {
        throw new Error ("Email is required");
    }
    if(!password) {
        throw new Error ("Password is required")
    }
    if(!process.env.JWT_SECRET){
        throw new Error ("JWT_SECRET not configured")
    }
    // await checkEmailExists(email, "Please Sign-Up")
    const user = await User.findOne({email});
    if(!user) throw new Error ("Invalid credentials")
    const isCompare = bcrypt.compareSync(password,user.password)
    if(!isCompare) throw new Error ("Invalid credentials")
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET!
        );
        return {
            user,
            token
        }
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error ("Login failed")
    }
}