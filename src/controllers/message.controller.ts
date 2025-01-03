import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import {
  createMessage,
  getMessagesByConversationId,
  markMessageAsRead,
} from '../services/message.service';

export const createMessageHandler = async (req: Request, res: Response) => {
  try {
    const message = await createMessage(req.body);
    if (message.error) {
      res
        .status(400)
        .json({ message: 'Not able to send message', sucess: false });
    }
    res.status(201).json({
      data: message,
      success: true,
      message: 'Message created successfully',
    });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch `,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// export const getAllMineMessagesHandler = async (
//   req: AuthRequest,
//   res: Response
// ) => {
//   try {
//     const { search, page, limit } = req.query;

//     const queryOptions = {
//       searchFields: ['sender'],
//       filters: {},
//       sort: '-createdAt',
//       page: Number(page) || 1,
//       limit: Number(limit) || 1000,
//       search,
//     };

//     const messages = await findAllMineMessages(
//       req.user?._id as any,
//       req.query,
//       queryOptions
//     );
//     res.status(200).json({
//       data: messages.data,
//       totalMessages: messages.meta.total,
//       totalPages: messages.meta.pages,
//       page: messages.meta.page,
//       success: true,
//     });
//   } catch (error) {
//     throw new InternalServerError(
//       'Failed to fetch offers',
//       ErrorCode.INTERNAL_SERVER
//     );
//   }
// };

export const getMessagesHandler = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const messages = await getMessagesByConversationId(
      conversationId,
      Number(page),
      Number(limit)
    );
    res.status(200).json({
      data: messages.data,
      totalMessages: messages.meta.total,
      totalPages: messages.meta.pages,
      page: messages.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(`Failed to fetch`, ErrorCode.INTERNAL_SERVER);
  }
};

export const markMessageAsReadHandler = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.body; // Assume `userId` is provided in the request body
    const updatedMessage = await markMessageAsRead(messageId, userId);
    res.status(200).json({
      data: updatedMessage,
      success: true,
      message: 'Message marked as read',
    });
  } catch (error) {
    throw new InternalServerError(`Failed to fetch`, ErrorCode.INTERNAL_SERVER);
  }
};
