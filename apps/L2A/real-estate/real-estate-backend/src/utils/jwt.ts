import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "secret"

export const generateToken = (userData:object)=>{
    return jwt.sign(userData, SECRET, {expiresIn:"7d"})
}

export const verifyToken = (token:string)=>{
    try{
        return jwt.verify(token,SECRET)
    }catch(error){
        console.log("error while verifying token");
        return null;
    }
}