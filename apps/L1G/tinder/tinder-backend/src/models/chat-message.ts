import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  notified: { type: Boolean, default: false },
});

export const ChatMessageModel = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);
