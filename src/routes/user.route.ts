import express from 'express';
import {
  createUserHandler,
  deleteUserByIdHandler,
  getAllUsersAdvanceSearchHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import upload from '../utils/multer.util';

const router = express.Router();

router.post(
  '/user',
  authenticate,
  upload.fields([{ name: 'profilePicture', maxCount: 1 }]),
  createUserHandler
);

router.post('/advance/search', authenticate, getAllUsersAdvanceSearchHandler);

router.get('/', authenticate, getAllUsersHandler);

router.get('/:id', authenticate, getUserByIdHandler);

router.patch(
  '/:id',
  authenticate,
  upload.fields([{ name: 'profilePicture', maxCount: 1 }]),
  updateUserByIdHandler
);

router.delete('/:id', authenticate, deleteUserByIdHandler);

export default router;
