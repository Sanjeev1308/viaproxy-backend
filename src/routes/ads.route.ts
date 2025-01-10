import express from 'express';
import {
  createAdsHandler,
  deleteAdsByIdHandler,
  getAdsByIdHandler,
  getAllAdsHandler,
  updateAdsByIdHandler,
} from '../controllers/ads.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/ads', authenticate, createAdsHandler);

router.get('/', authenticate, getAllAdsHandler);

router.get('/:id', authenticate, getAdsByIdHandler);

router.patch('/:id', authenticate, updateAdsByIdHandler);

router.delete('/:id', authenticate, deleteAdsByIdHandler);

export default router;
