import { model, Model, models, Schema, Document, Types } from 'mongoose';

// Define AttachmentType
export interface AttachmentType {
  type: string;
  url: string;
}

// Define the IMessage interface, extending Document
export interface IMessage extends Document {
  senderId: Types.ObjectId;
  content: string;
  timeStamp: Date;
  conversationId: Types.ObjectId;
  isRead: boolean;
  attachments?: AttachmentType[];
}

// Define the Message schema
const MessageSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Changed to singular 'User' to match conventional naming
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true, // Changed to true as it seems essential
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

// Create and export the MessageModel
export const MessageModel: Model<IMessage> = models.Message || model<IMessage>('Message', MessageSchema);

// Export default for consistency with other models
export default MessageModel;
