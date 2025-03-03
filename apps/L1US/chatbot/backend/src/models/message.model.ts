import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  id: string;
  chatID: string; 
  query: string;
  response: string;
  timestamp: Date;
}

const messageSchema = new Schema({
  id: { type: String, required: true },
  chatID: { type: String, required: true },
  query: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
});

export const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
