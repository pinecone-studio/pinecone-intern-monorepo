import { Schema, model, models } from 'mongoose';

const replySchema = new Schema({
  parentId: { type: String, default: '' },
  reply: { type: String, required: true },
  commentId: { type: Schema.Types.ObjectId, ref: 'comment', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  ipAddress: String,
  status: {
    type: String,
    enum: ['DELETED', 'HIDDEN', 'NORMAL'],
    default: 'NORMAL',
  },
});
const ReplyModel = models.reply || model('reply', replySchema);
export default ReplyModel;
