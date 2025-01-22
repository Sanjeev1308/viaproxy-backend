import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import Conversation from '../models/conversation.model';
import { MessageService } from '../services/message.service';

const messageService = new MessageService();

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT'],
      credentials: true,
    },
  });

  // Store connected users
  const connectedUsers = new Map<string, string>();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Register user
    socket.on('register', (userId: string) => {
      connectedUsers.set(userId, socket.id);
      console.log('User registered:', userId);
    });

    // Handle sending messages
    socket.on(
      'send_message',
      async (data: { sender: string; receiver: string; content: string }) => {
        try {
          const result = await messageService.sendMessage(
            data.sender,
            data.receiver,
            data.content
          );

          // Send to receiver if online
          const receiverSocketId = connectedUsers.get(data.receiver);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('receive_message', result);
          }

          // Confirm to sender
          socket.emit('message_sent', result);
        } catch (error) {
          socket.emit('message_error', {
            error: 'Failed to send message',
          });
        }
      }
    );

    socket.on(
      'mark_messages_read',
      async (data: { conversationId: string; userId: string }) => {
        try {
          await messageService.markMessagesAsRead(
            data.conversationId,
            data.userId
          );

          // Notify other participants about read status update
          const conversation = await Conversation.findById(data.conversationId);
          if (conversation) {
            conversation.participants.forEach((participantId) => {
              if (participantId !== data.userId) {
                const participantSocketId = connectedUsers.get(participantId);
                if (participantSocketId) {
                  io.to(participantSocketId).emit('messages_read', {
                    conversationId: data.conversationId,
                    userId: data.userId,
                  });
                }
              }
            });
          }
        } catch (error) {
          socket.emit('read_status_error', {
            error: 'Failed to mark messages as read',
          });
        }
      }
    );

    // Handle disconnection
    socket.on('disconnect', () => {
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
