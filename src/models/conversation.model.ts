import { model, Schema } from 'mongoose';
import { IConversation } from '../interfaces/conversation.interface';

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: String, required: true }],
    lastMessage: { type: String },
    unreadCount: { type: Map, of: Number, default: {} },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model('Conversation', ConversationSchema);
