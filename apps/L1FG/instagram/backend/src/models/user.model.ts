import  { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {type: String},
    fullName: {type: String},
    bio: {type: String},
    password: {type: String},
    isPrivate: {type: Boolean},
    hasStory: {type: Boolean},
    profileImage: {type: String},
    gender: {type: String, enum:["Female", "Male", "not_know"], default:"not_know"}
})

export const UserModel = models["User"] || model("User", userSchema)