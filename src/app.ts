import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { corsOptions } from './config/corsOption';
import { validateEnv } from './config/env.config';
import { connectToDB } from './config/mongoose';
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from './middlewares/errorHandler.middleware';
import apiRouter from './routes';

export const bootstrapExpress = (app: any) => {
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
  app.use('/api', apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
};

export const bootstrap = async (app: any) => {
  validateEnv();
  await connectToDB();
  bootstrapExpress(app);
  // logger.info('Express app initiated.');
};
