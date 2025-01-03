import express, { Express } from 'express';
import { Server, createServer } from 'http';
import mongoose from 'mongoose';
// import { Server as SocketServer } from 'socket.io';
import { bootstrap } from './app';
import { validateEnv } from './config/env.config';
// import ConversationModel from './models/conversation.model';
// import MessageModel from './models/message.model';

const exitHandler = (server: Server | null) => {
  if (server) {
    server.close(async () => {
      //   logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server: Server) => {
  return function (error: Error) {
    // logger.error(error);
    exitHandler(server);
  };
};

const startServer = async () => {
  const app: Express = express();
  await bootstrap(app);

  const httpServer = createServer(app);
  const port = validateEnv()?.port || 5000;

  // const io = new SocketServer(httpServer, {
  //   cors: {
  //     origin: '*',
  //     methods: ['GET', 'POST'],
  //   },
  // });

  // io.on('connection', (socket) => {
  //   console.log('User connected:', socket.id);

  //   // Join conversation room
  //   socket.on('join_conversation', (conversationId: string) => {
  //     socket.join(conversationId);
  //     console.log(`User joined conversation: ${conversationId}`);
  //   });

  //   // Handle new message
  //   socket.on(
  //     'send_message',
  //     async (data: {
  //       conversationId: string;
  //       sender: string;
  //       content: string;
  //       attachments?: string[];
  //     }) => {
  //       try {
  //         const newMessage = await MessageModel.create({
  //           conversationId: data.conversationId,
  //           sender: data.sender,
  //           content: data.content,
  //           attachments: data.attachments,
  //           readBy: [data.sender],
  //         });

  //         await ConversationModel.findByIdAndUpdate(data.conversationId, {
  //           lastMessage: newMessage._id,
  //         });

  //         const populatedMessage = await newMessage.populate(['sender']);

  //         io.to(data.conversationId).emit('receive_message', populatedMessage);
  //       } catch (error) {
  //         console.error('Error sending message:', error);
  //       }
  //     }
  //   );

  //   // Handle read receipts
  //   socket.on(
  //     'mark_read',
  //     async (data: {
  //       conversationId: string;
  //       userId: string;
  //       messageId: string;
  //     }) => {
  //       try {
  //         await MessageModel.findByIdAndUpdate(data.messageId, {
  //           $addToSet: { readBy: data.userId },
  //         });

  //         io.to(data.conversationId).emit('message_read', {
  //           messageId: data.messageId,
  //           userId: data.userId,
  //         });
  //       } catch (error) {
  //         console.error('Error marking message as read:', error);
  //       }
  //     }
  //   );

  //   socket.on('disconnect', () => {
  //     console.log('User disconnected:', socket.id);
  //   });
  // });

  const server: Server = httpServer.listen(port, () => {
    // logger.info(`server listening on port ${port}`);
  });

  process.on('uncaughtException', unExpectedErrorHandler(server));
  process.on('unhandledRejection', unExpectedErrorHandler(server));
  process.on('SIGTERM', () => {
    // logger.info('SIGTERM recieved');
    if (server) {
      server.close();
    }
  });

  mongoose.connection.on('error', (err) => {
    console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
  });
};

startServer();
