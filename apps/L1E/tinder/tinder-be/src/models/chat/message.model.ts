import { model, Model, models, Schema } from 'mongoose';

export type AttachmentType = {
  type: string;
  url: string;
};

export type MessageModelType = {
  _id: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  content: {
    type: string;
    required: true;
  };
  timeStamp: Date;
  conversationId: Schema.Types.ObjectId;
  isRead: boolean;
  attachments?: AttachmentType[];
};

const MessageSchema = new Schema<MessageModelType>({
  senderId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Folder',
  },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now, required: true },
  isRead: { type: Boolean, default: false },
  attachments: [
    {
      type: { type: String, required: false },
      url: { type: String, required: false },
    },
  ],
});

export const MessageModel: Model<MessageModelType> = models['Message'] || model<MessageModelType>('Message', MessageSchema);
