import mongoose, { model, models, ObjectId, Schema } from "mongoose";

export type PostType = {
    _id: string | ObjectId,
    image: string[],
    description?: string,
    likes: ObjectId[],
    comments: ObjectId[],
    createdAt: Date
};

const PostSchema = new Schema<PostType>({
    image: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "Like"
    },
    comments: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "Comment"
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

export const Post = models['post'] || model('post', PostSchema)