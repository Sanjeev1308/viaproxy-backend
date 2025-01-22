import express from 'express';
import {
  createConversation,
  getConversations,
  getMessages,
  markMessagesAsRead,
  sendMessage,
} from '../controllers/message.controller';

const router = express.Router();

router.get('/conversations/:userId', getConversations);
router.get('/messages/:conversationId', getMessages);
router.post('/send', sendMessage);
router.post('/conversations', createConversation);
router.put('/messages/read/:conversationId', markMessagesAsRead);

export default router;
