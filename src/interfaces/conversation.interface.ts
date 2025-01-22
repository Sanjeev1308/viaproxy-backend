import mongoose, { Document } from 'mongoose';

export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: string;
  unreadCount: { [key: string]: number };
  updatedAt: Date;
}
