import express from 'express';
import {
  createAdsHandler,
  deleteAdsByIdHandler,
  getAdsByIdHandler,
  getAllAdsHandler,
  updateAdsByIdHandler,
} from '../controllers/ads.controller';
import { authenticate } from '../middlewares/auth.middleware';
import upload from '../utils/multer.util';

const router = express.Router();

router.post(
  '/ads',
  authenticate,
  upload.fields([
    { name: 'zone1Image', maxCount: 1 },
    { name: 'zone2Image', maxCount: 1 },
    { name: 'zone3Image', maxCount: 1 },
  ]),
  createAdsHandler
);

router.get('/', authenticate, getAllAdsHandler);

router.get('/:id', authenticate, getAdsByIdHandler);

router.patch(
  '/:id',
  authenticate,
  upload.fields([
    { name: 'zone1Image', maxCount: 1 },
    { name: 'zone2Image', maxCount: 1 },
    { name: 'zone3Image', maxCount: 1 },
  ]),
  updateAdsByIdHandler
);

router.delete('/:id', authenticate, deleteAdsByIdHandler);

export default router;
