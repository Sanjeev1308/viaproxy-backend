import express from 'express';
import {
  deleteUserByIdHandler,
  getAllUsersHandler,
  updateUserByIdHandler,
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authenticate, getAllUsersHandler);

router.patch('/:id', authenticate, updateUserByIdHandler);

router.delete('/:id', authenticate, deleteUserByIdHandler);

export default router;
