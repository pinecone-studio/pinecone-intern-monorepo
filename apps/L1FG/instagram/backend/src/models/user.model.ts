import  { model, models, Schema } from "mongoose";
const userSchema = new Schema({
    userName: {type: String
        ,required:true
    },
    fullName: {type: String,
        required:true
    },
    email:{type:String,unique:true,required:true},
    bio: {type: String,default:""},
    password: {type: String,required:true},
    isPrivate: {type: Boolean,default:false},
    hasStory: {type: Boolean,default:false},
    profileImage: {type: String},
    gender: {type: String, enum:["female", "male", "not_know"], default:"not_know"}
})

 export const UserModel = models["User"] || model("User", userSchema)
 