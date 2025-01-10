import express from 'express';
import adsRoute from './ads.route';
import authRoute from './auth.route';
import categoriesRoute from './category.route';
import conversationRoute from './conversation.route';
import messageRoute from './message.route';
import offerRoute from './offer.route';
import productsRoute from './product.route';
import servicesRoute from './service.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/offers', offerRoute);
router.use('/messages', messageRoute);
router.use('/conversations', conversationRoute);
router.use('/products', productsRoute);
router.use('/services', servicesRoute);
router.use('/categories', categoriesRoute);
router.use('/ads', adsRoute);

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default router;
