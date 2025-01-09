import { Schema, model, Document, models, Types } from 'mongoose';

export interface IConversation extends Document {
  userOne: Types.ObjectId;
  userTwo: Types.ObjectId;
  createdAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
  userOne: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  userTwo: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

ConversationSchema.index({ userOne: 1, userTwo: 1 }, { unique: true });
ConversationSchema.index({ userTwo: 1, userOne: 1 });

const ConversationModel = models.Conversation || model<IConversation>('Conversation', ConversationSchema);

export default ConversationModel;
