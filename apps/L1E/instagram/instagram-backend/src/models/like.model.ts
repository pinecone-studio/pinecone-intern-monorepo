import mongoose, { model, models, ObjectId, Schema } from "mongoose"

export type LikeType = {
    _id: string | ObjectId,
    userId: ObjectId,
    createdAt: Date,
}

const LikeSchema = new Schema<LikeType>({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

export const Like = models['like'] || model('like', LikeSchema)