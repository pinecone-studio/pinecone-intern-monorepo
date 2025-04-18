import mongoose from "mongoose";

const USER_SCHEMA = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, default:false},
    phone: Number,
    updatedAt: {type: Date, default:Date.now},
    createdAt: {type: Date, default:Date.now}
})
export const userModel = mongoose.model('Users', USER_SCHEMA)