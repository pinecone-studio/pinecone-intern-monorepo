import { model, Model, models, Schema, Document, Types } from 'mongoose';

export interface AttachmentType {
  type: string;
  url: string;
}

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  content: string;
  timeStamp: Date;
  conversationId: Types.ObjectId;
  isRead: boolean;
  images: string[];
}

const MessageSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Conversation',
  },
  content: {
    type: String,
    required: false,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      type: String,
      required: true,
      default: '',
    },
  ],
});

export const MessageModel: Model<IMessage> = models.Message || model<IMessage>('Message', MessageSchema);

export default MessageModel;
