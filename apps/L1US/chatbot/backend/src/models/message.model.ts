import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
    query: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model('Message', messageSchema);
