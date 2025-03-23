import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
    query: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.models.Message || mongoose.model('Message', messageSchema);
