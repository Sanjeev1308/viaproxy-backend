import express from 'express';
import {
  createCategoryHandler,
  deleteCategoryByIdHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
  getSubCategoriesByCategoryIdHandler,
  updateCategoryByIdHandler,
} from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/category', authenticate, createCategoryHandler);

router.get('/', authenticate, getAllCategoryHandler);

router.get('/:id', authenticate, getCategoryByIdHandler);

router.get(
  '/:id/sub-category',
  authenticate,
  getSubCategoriesByCategoryIdHandler
);

router.patch('/:id', authenticate, updateCategoryByIdHandler);

router.delete('/:id', authenticate, deleteCategoryByIdHandler);

export default router;
