import express from 'express';
import {
  createProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductByIdHandler,
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/product', authenticate, createProductHandler);

router.get('/', authenticate, getAllProductsHandler);

router.get('/:id', authenticate, getProductByIdHandler);

router.patch('/:id', authenticate, updateProductByIdHandler);

router.delete('/:id', authenticate, deleteProductByIdHandler);

export default router;
