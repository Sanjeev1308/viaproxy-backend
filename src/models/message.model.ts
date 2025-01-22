import { model, Schema } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model('Message', MessageSchema);
