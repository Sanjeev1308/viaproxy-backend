import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  sender: string;
  receiver: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
