import MessageModel from '../models/message.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export const createMessage = async (data: any) => {
  try {
    const result = await MessageModel.create(data);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
};

export async function findAllMineMessages(
  sender: string,
  query: any,
  queryOptions: any
) {
  const filters = {
    ...queryOptions.filters,
    sender: { $eq: sender },
  };
  queryOptions.filters = filters;

  const result = await queryBuilder(MessageModel, query, queryOptions);

  const populatedData = await MessageModel.populate(result.data, {
    path: 'receiver', // Path to the receiver field
    select: 'firstName lastName email', // Specify the fields to include
  });

  return {
    ...result,
    data: populatedData,
  };
}

export const getMessagesByConversationId = async (
  conversationId: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;

  const messages = await MessageModel.find({ conversationId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await MessageModel.countDocuments({ conversationId });

  return {
    data: messages,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};

export const markMessageAsRead = async (messageId: string, userId: string) => {
  const message = await MessageModel.findByIdAndUpdate(
    messageId,
    { $addToSet: { readBy: userId } }, // Add userId to `readBy` array if not already present
    { new: true }
  );
  return message;
};
