import ConversationModel from '../models/conversation.model';

export const createConversation = async (data: any) => {
  const conversation = new ConversationModel(data);
  return await conversation.save();
};

export const getConversationsByUser = async (userId: string) => {
  return await ConversationModel.find({ participants: userId })
    .populate('participants', 'name email') // Populate participants' details
    .populate('lastMessage', 'content createdAt') // Populate last message details
    .sort({ updatedAt: -1 });
};

export const getConversationById = async (id: string) => {
  return await ConversationModel.findById(id)
    .populate('participants', 'name email') // Populate participants' details
    .populate('lastMessage', 'content createdAt'); // Populate last message details
};

export const updateLastMessageInConversation = async (
  id: string,
  lastMessage: string
) => {
  return await ConversationModel.findByIdAndUpdate(
    id,
    { lastMessage },
    { new: true }
  );
};
