import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type UserType = {
    _id: ObjectId | string;
    email: string;
    password: string;
    fullName: string;
    userName: string;
    isPrivate?: boolean;
    profileImage?: string;
    bio?: string;
    followers?: ObjectId[];
    following?: ObjectId[];
    posts?: ObjectId[];
    receivedRequests: ObjectId[]
};

const UserSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    followers: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "User"
    },
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "User"
    },
    posts: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "Post"
    },
    receivedRequests: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
        ref: "ReceivedRequest"
    }
});

export const User = models['user'] || model('user', UserSchema);
