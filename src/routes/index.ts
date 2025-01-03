import express from 'express';
import authRoute from './auth.route';
import conversationRoute from './conversation.route';
import messageRoute from './message.route';
import offerRoute from './offer.route';
import userRoute from './user.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/offers', offerRoute);
router.use('/messages', messageRoute);
router.use('/conversations', conversationRoute);

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default router;
