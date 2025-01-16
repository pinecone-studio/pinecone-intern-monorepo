import mongoose, { model, models, Schema } from "mongoose"; 

const commentLikeSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref:"User"},
    commentId: {type: mongoose.Types.ObjectId, ref:"Comment"}
})

export const CommentLikeModel = models["CommentLike"] || model("CommentLike", commentLikeSchema)