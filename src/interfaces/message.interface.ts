import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  readBy: mongoose.Types.ObjectId[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
