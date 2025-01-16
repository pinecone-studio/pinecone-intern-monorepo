import mongoose, { model, models, Schema } from "mongoose";

const followSchema  = new Schema({
    followerId: {type:mongoose.Types.ObjectId, ref: "User"},
    target: {type:mongoose.Types.ObjectId, ref: "User"},
})

export const FollowerModel = models["Follow"] || model("Follow", followSchema)