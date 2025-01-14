import express from 'express';
import {
  createServiceHandler,
  deleteServiceByIdHandler,
  getAllServicesHandler,
  getServiceByIdHandler,
  updateServiceByIdHandler,
} from '../controllers/service.controller';
import { authenticate } from '../middlewares/auth.middleware';
import upload from '../utils/multer.util';

const router = express.Router();

router.post(
  '/service',
  authenticate,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createServiceHandler
);

router.get('/', authenticate, getAllServicesHandler);

router.get('/:id', authenticate, getServiceByIdHandler);

router.patch(
  '/:id',
  authenticate,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  updateServiceByIdHandler
);

router.delete('/:id', authenticate, deleteServiceByIdHandler);

export default router;
