import { MutationResolvers } from "../../../generated";
import { UserModel } from "../../../models";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signIn : MutationResolvers["signIn"] = async(_ , {input}) =>{
    const {email, password} = input;
    const user= await UserModel.findOne({email : email});
    if(!user){
        throw new Error("User Not Found");
    }
    const isCorrectPassword =await bcrypt.compare(password, user.password);
    if(!isCorrectPassword)
    {
        throw new Error("Password is wrong");
    }
    const sessionSecret = process.env.JWT_SECRET;
    if (!sessionSecret) {
        throw new Error("Secret is not here bro");
    }
    const token = jwt.sign({ userId: user._id }, sessionSecret, {
        expiresIn: "12h",
    });     
    return {
        user ,
        token
    }
    
}