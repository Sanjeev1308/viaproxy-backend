import express from 'express';
import {
  createOfferHandler,
  deleteOfferByIdHandler,
  getAllOffersHandler,
  getOfferByIdHandler,
  updateOfferByIdHandler,
} from '../controllers/offer.controller';
import { authenticate } from '../middlewares/auth.middleware';
import upload from '../utils/multer.util';

const router = express.Router();

router.post(
  '/offer',
  authenticate,
  upload.fields([
    { name: 'offerImage', maxCount: 1 },
    { name: 'specialConditionsFile', maxCount: 1 },
  ]),
  createOfferHandler
);

router.get('/', authenticate, getAllOffersHandler);

router.get('/:id', authenticate, getOfferByIdHandler);

router.patch(
  '/:id',
  authenticate,
  upload.fields([
    { name: 'offerImage', maxCount: 1 },
    { name: 'specialConditionsFile', maxCount: 1 },
  ]),
  updateOfferByIdHandler
);

router.delete('/:id', authenticate, deleteOfferByIdHandler);

export default router;
