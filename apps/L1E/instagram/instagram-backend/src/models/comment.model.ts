import mongoose, { model, models, ObjectId, Schema } from "mongoose";

export type CommentType = {
    _id: string | ObjectId,
    text: string,
    userId: ObjectId,
    postId: ObjectId,
    createdAt: Date
}

const CommentSchema = new Schema<CommentType>({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Post"
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

export const Comment = models['comment'] || model('comment', CommentSchema)