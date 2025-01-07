import { model, Model, models, Schema, Document } from 'mongoose';

// Define AttachmentType
export type AttachmentType = {
  type: string;
  url: string;
};

// Define the MessageModelType interface, extending Document to have _id as part of the schema
export interface IMessage extends Document {
  senderId: Schema.Types.ObjectId; // This will now refer to a User model
  content: string;
  timeStamp: Date;
  conversationId: Schema.Types.ObjectId;
  isRead: boolean;
  attachments?: AttachmentType[];
}

// Define the Message schema with proper types
const MessageSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users', // Referencing the 'Users' collection, ensure you have the correct model name
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Folder', // Reference to the Folder model, update if needed
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  attachments: [
    {
      type: { type: String, required: false },
      url: { type: String, required: false },
    },
  ],
});

// Create the MessageModel, using the schema and interface
export const MessageModel: Model<IMessage> = models['Message'] || model<IMessage>('Message', MessageSchema);
