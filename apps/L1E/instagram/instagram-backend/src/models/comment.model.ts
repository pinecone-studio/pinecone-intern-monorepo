import mongoose, { model, models, ObjectId, Schema } from "mongoose";

export type CommentType = {
    _id: string | ObjectId,
    text: string,
    userId: ObjectId,
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
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

export const Comment = models['comment'] || model('comment', CommentSchema)