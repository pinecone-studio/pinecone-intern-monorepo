import { Schema, models, model } from 'mongoose';

const messageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, required: true, ref: 'Conversation' },
    query: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = models.Message || model('Message', messageSchema);
