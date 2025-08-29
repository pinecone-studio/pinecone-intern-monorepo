import mongoose, { model, models, ObjectId, Schema } from "mongoose";

export type PostType = {
    _id: string | ObjectId,
    image: string[],
    description?: string,
    likes: ObjectId[],
    user: ObjectId[], 
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
    user:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        required: true
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