import mongoose, { model, models, ObjectId, Schema } from "mongoose"

export type LikeType = {
    _id: string | ObjectId,
    userId: ObjectId,
    postId: ObjectId,
    createdAt: Date,
}

const LikeSchema = new Schema<LikeType>({
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
})

export const Like = models['like'] || model('like', LikeSchema)