import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validateEnv } from '../config/env.config';
import { ErrorCode } from '../errors/custom.error';
import UnAuthenticatedError from '../errors/unauthenticated.error';
import { findUserById } from '../services/user.service';
import { extractTokenfromHeader } from '../utils/helper.util';

export const authenticate = async (
  req: any & { user?: any },
  res: any,
  next: NextFunction
) => {
  try {
    const jwtconfig = validateEnv()?.jwtconfig;
    const token = extractTokenfromHeader(req);
    if (!token)
      throw new UnAuthenticatedError(
        'Provide token',
        ErrorCode.TOKEN_NOT_FOUND
      );

    const decoded: any = jwt.verify(token, jwtconfig?.accessSecret || '');
    const user = await findUserById(decoded.userId);

    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
