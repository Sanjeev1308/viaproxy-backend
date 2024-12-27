import express from 'express';
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authenticate, getAllUsersHandler);

router.get('/:id', authenticate, getUserByIdHandler);

router.patch('/:id', authenticate, updateUserByIdHandler);

router.delete('/:id', authenticate, deleteUserByIdHandler);

export default router;
