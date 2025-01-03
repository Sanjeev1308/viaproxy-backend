import express from 'express';
import {
  createMessageHandler,
  getMessagesHandler,
  markMessageAsReadHandler,
} from '../controllers/message.controller';

const router = express.Router();

// router.get('/', authenticate, getAllMineMessagesHandler); // Get All messages
router.post('/', createMessageHandler); // Create a new message
router.get('/:conversationId', getMessagesHandler); // Get messages for a conversation
router.patch('/:messageId/read', markMessageAsReadHandler); // Mark a message as read

export default router;
