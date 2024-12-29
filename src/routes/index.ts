import express from 'express';
import authRoute from './auth.route';
import offerRoute from './offer.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/offers', offerRoute);

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default router;
