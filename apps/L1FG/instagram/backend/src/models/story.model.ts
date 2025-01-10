import mongoose, { model, models, Schema } from "mongoose";

const storySchema = new Schema({
    storyImage: {type:String},
    userId: {type:mongoose.Types.ObjectId, ref:"User"},
    expiringAt: {type: Date},
    duration: {type: String}
})

export const StoryModel = models["Story"] || model("Story", storySchema)