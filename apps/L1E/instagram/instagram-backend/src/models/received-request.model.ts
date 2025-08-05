import mongoose, { model, models, ObjectId, Schema } from "mongoose"

export type ReceivedRequestType = {
    _id: string | ObjectId,
    recieverId: ObjectId,
    senderId: ObjectId,
    createdAt: Date
}

const ReceivedRequestSchema = new Schema<ReceivedRequestType>({
    recieverId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    senderId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
}, {
    collection: 'receivedrequest'
});

export const ReceivedRequest = models['receivedrequest'] || model('receivedrequest', ReceivedRequestSchema)