import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  matchedAt: { type: Date, default: Date.now },
  unmatched: { type: Boolean, default: false },
});

export const MatchModel = mongoose.models.Match || mongoose.model('Match', matchSchema);
