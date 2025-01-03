import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  createConversation,
  getConversationById,
  getConversationsByUser,
  updateLastMessageInConversation,
} from '../services/conversation.service';

export const createConversationHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { participants, title, isGroup } = req.body;
    const createdBy = req.user?._id as string; // Extracted from authenticated user

    const conversation = await createConversation({
      participants,
      title,
      isGroup,
      createdBy,
    });

    res.status(201).json({
      data: conversation,
      success: true,
      message: 'Conversation created successfully',
    });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch `,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getConversationsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id as string; // Extracted from authenticated user

    const conversations = await getConversationsByUser(userId);
    res.status(200).json({
      data: conversations,
      success: true,
      message: 'Conversations fetched successfully',
    });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch `,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getConversationByIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const conversation = await getConversationById(id);
    if (!conversation) {
      res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.status(200).json({
      data: conversation,
      success: true,
      message: 'Conversation fetched successfully',
    });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch `,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateLastMessageHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { lastMessage } = req.body;

    const updatedConversation = await updateLastMessageInConversation(
      id,
      lastMessage
    );
    if (!updatedConversation) {
      res.status(404).json({
        success: false,
        message: 'Conversation not found',
      });
    }

    res.status(200).json({
      data: updatedConversation,
      success: true,
      message: 'Last message updated successfully',
    });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch `,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
