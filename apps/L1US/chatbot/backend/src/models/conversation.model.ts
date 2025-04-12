import { Schema, models, model } from 'mongoose';

const conversationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const ConversationModel = models.Conversation || model('Conversation', conversationSchema);
