import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { createServer } from 'http';
import path from 'path';
import { Server as SocketServer } from 'socket.io';
import { corsOptions } from './config/corsOption';
import { validateEnv } from './config/env.config';
import { connectToDB } from './config/mongoose';
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from './middlewares/errorHandler.middleware';
import ConversationModel from './models/conversation.model';
import MessageModel from './models/message.model';
import apiRouter from './routes';

export const bootstrapExpress = (app: any) => {
  const httpServer = createServer(app);
  const io = new SocketServer(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connection', (socket) => {
    // Join conversation room
    socket.on('join_conversation', (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

    socket.on(
      'send_message',
      async (data: {
        conversationId: string;
        sender: string;
        content: string;
        attachments?: string[];
      }) => {
        try {
          const newMessage = await MessageModel.create({
            conversationId: data.conversationId,
            sender: data.sender,
            content: data.content,
            attachments: data.attachments,
            readBy: [data.sender],
          });

          await ConversationModel.findByIdAndUpdate(data.conversationId, {
            lastMessage: newMessage._id,
          });

          const populatedMessage = await newMessage.populate(['sender']);

          io.to(data.conversationId).emit('receive_message', populatedMessage);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    );

    // Handle read receipts
    socket.on(
      'mark_read',
      async (data: {
        conversationId: string;
        userId: string;
        messageId: string;
      }) => {
        try {
          await MessageModel.findByIdAndUpdate(data.messageId, {
            $addToSet: { readBy: data.userId },
          });

          io.to(data.conversationId).emit('message_read', {
            messageId: data.messageId,
            userId: data.userId,
          });
        } catch (error) {
          console.error('Error marking message as read:', error);
        }
      }
    );

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // app.use(successHandler);
  // app.use(errorHandler);
  app.use(ExpressMongoSanitize());
  // app.use(morgan('dev'));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.xssFilter());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );
  app.use(cors());
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  app.use('/api', apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  io.on('connection', (socket) => {
    socket.on('join', (userId: string) => {
      socket.join(userId);
    });

    socket.on(
      'sendMessage',
      (data: { sender: string; receiver: string; content: string }) => {
        io.to(data.receiver).emit('newMessage', data);
      }
    );
  });
};

export const bootstrap = async (app: any) => {
  validateEnv();
  await connectToDB();
  bootstrapExpress(app);
  // logger.info('Express app initiated.');
};
