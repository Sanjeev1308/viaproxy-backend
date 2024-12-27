import { NextFunction, Response } from 'express';

export const checkOwnershipOrAdmin = (
  resource: any,
  user: any,
  res: Response,
  next: NextFunction
) => {
  if (resource.createdBy.toString() === user.id || user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: You don't have permission" });
  }
};
