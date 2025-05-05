import mongoose from "mongoose";

const USER_SCHEMA = new mongoose.Schema({
    email:{type: String, required: true, unique:true},
    password:{type:String, required:false},
    isAdmin: {type:Boolean, default:false},
    phone: {type: Number},
    updatedAt:{type:Date, default:Date.now()},
    createdAt:{type:Date, default:Date.now()}
})

export const USER_MODEL = mongoose.models.User || mongoose.model('User', USER_SCHEMA)