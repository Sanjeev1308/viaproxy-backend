import Conversation from '../models/conversation.model';
import Message from '../models/message.model';

export class MessageService {
  async createConversation(sender: string, receiver: string) {
    try {
      // Check if conversation already exists
      const existingConversation = await Conversation.findOne({
        participants: { $all: [sender, receiver], $size: 2 },
      });

      if (existingConversation) {
        return existingConversation;
      }

      // Create new conversation
      const conversation = await Conversation.create({
        participants: [sender, receiver],
        unreadCount: { [sender]: 0, [receiver]: 0 },
      });

      return conversation;
    } catch (error) {
      throw new Error('Error creating conversation' + error);
    }
  }

  async markMessagesAsRead(conversationId: string, userId: string) {
    try {
      // Mark all messages as read
      await Message.updateMany(
        {
          conversationId,
          receiver: userId,
          isRead: false,
        },
        {
          $set: { isRead: true },
        }
      );

      // Reset unread count for the user
      const conversation = await Conversation.findById(conversationId);
      if (conversation) {
        const unreadCount = conversation.unreadCount || {};
        unreadCount[userId] = 0;
        conversation.unreadCount = unreadCount;
        await conversation.save();
      }

      return true;
    } catch (error) {
      throw new Error('Error marking messages as read');
    }
  }

  // Update sendMessage method
  async sendMessage(sender: string, receiver: string, content: string) {
    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver], $size: 2 },
      });

      if (!conversation) {
        conversation = await this.createConversation(sender, receiver);
      }

      // Update conversation
      conversation.lastMessage = content;
      conversation.updatedAt = new Date();

      // Increment unread count for receiver
      const unreadCount = conversation.unreadCount || {};
      unreadCount[receiver] = (unreadCount[receiver] || 0) + 1;
      conversation.unreadCount = unreadCount;

      await conversation.save();

      // Create message
      const message = await Message.create({
        sender,
        receiver,
        content,
        conversationId: conversation._id,
        isRead: false,
      });

      return { message, conversation };
    } catch (error) {
      throw new Error('Error sending message' + error);
    }
  }

  async getMessages(conversationId: string) {
    try {
      const messages = await Message.find({ conversationId })
        .sort({
          createdAt: 1,
        })
        .populate('receiver', 'firstName lastName email profilePicture')
        .populate('sender', 'firstName lastName email profilePicture');
      return messages;
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }

  async getConversations(userId: string) {
    try {
      const conversations = await Conversation.find({
        participants: { $in: [userId] },
      })
        .sort({ updatedAt: -1 })
        .populate('participants', 'firstName lastName email profilePicture');
      return conversations;
    } catch (error) {
      throw new Error('Error fetching conversations');
    }
  }
}
