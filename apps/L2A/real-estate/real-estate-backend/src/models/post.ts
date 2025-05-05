import mongoose from "mongoose";
const POST_SCHEMA = new mongoose.Schema({
    propertyOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    propertyDetail: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() }
})
export const POST_MODEL = mongoose.models.Post || mongoose.model('Post', POST_SCHEMA)