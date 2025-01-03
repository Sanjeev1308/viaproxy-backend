import express from 'express';
import {
  createConversationHandler,
  getConversationByIdHandler,
  getConversationsHandler,
  updateLastMessageHandler,
} from '../controllers/conversation.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authenticate, createConversationHandler); // Create a new conversation
router.get('/', authenticate, getConversationsHandler); // Get all conversations for a user
router.get('/:id', authenticate, getConversationByIdHandler); // Get a conversation by ID
router.patch('/:id/lastMessage', authenticate, updateLastMessageHandler); // Update last message in a conversation

export default router;
