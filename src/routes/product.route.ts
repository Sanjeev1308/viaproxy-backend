import express from 'express';
import {
  createProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import upload from '../utils/multer.util';

const router = express.Router();

router.post(
  '/product',
  authenticate,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  createProductHandler
);

router.get('/', authenticate, getAllProductsHandler);

router.get('/:id', authenticate, getProductByIdHandler);

router.patch(
  '/:id',
  authenticate,
  upload.fields([{ name: 'image', maxCount: 1 }]),
  updateProductByIdHandler
);

router.delete('/:id', authenticate, deleteProductByIdHandler);

export default router;
