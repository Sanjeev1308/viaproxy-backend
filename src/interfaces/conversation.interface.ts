import { Document } from 'mongoose';

export interface IConversation extends Document {
  participants: string[];
  lastMessage?: string;
  unreadCount: { [key: string]: number };
  updatedAt: Date;
}
