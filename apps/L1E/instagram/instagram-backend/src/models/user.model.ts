import { Schema, model, models } from 'mongoose';

export type UserType = {
    _id: string;
    name: string;
    userName: string;
};

const userSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
});

export const userModel = models['user'] || model('user', userSchema);
