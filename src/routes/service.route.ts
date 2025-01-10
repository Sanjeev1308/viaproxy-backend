import express from 'express';
import {
  createServiceHandler,
  deleteServiceByIdHandler,
  getAllServicesHandler,
  getServiceByIdHandler,
  updateServiceByIdHandler,
} from '../controllers/service.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/service', authenticate, createServiceHandler);

router.get('/', authenticate, getAllServicesHandler);

router.get('/:id', authenticate, getServiceByIdHandler);

router.patch('/:id', authenticate, updateServiceByIdHandler);

router.delete('/:id', authenticate, deleteServiceByIdHandler);

export default router;
