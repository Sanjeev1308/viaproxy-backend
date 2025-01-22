import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participant1, participant2 } = req.body;
    const conversation = await messageService.createConversation(
      participant1,
      participant2
    );
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating conversation' + error });
  }
};

export const markMessagesAsRead = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.body;
    const result = await messageService.markMessagesAsRead(
      conversationId,
      userId
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error marking messages as read' });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await messageService.getConversations(userId);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching conversations' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await messageService.getMessages(conversationId);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sender, receiver, content } = req.body;
    const message = await messageService.sendMessage(sender, receiver, content);
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' + error });
  }
};
