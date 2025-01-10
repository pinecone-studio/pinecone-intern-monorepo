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
  attachments?: AttachmentType[];
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
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  attachments: [
    {
      type: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export const MessageModel: Model<IMessage> = models.Message || model<IMessage>('Message', MessageSchema);

export default MessageModel;
