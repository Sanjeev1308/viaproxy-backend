// import { NextFunction, Request, Response } from 'express';

// export const userSpecificFilter = (
//   req: Request & { user?: any },
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user.role !== 'admin') {
//     req.filter = { createdBy: req.user._id };
//   } else {
//     req.filter = {}; // No filter for superadmin
//   }
//   next();
// };
