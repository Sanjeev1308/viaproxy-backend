import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.routes';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

router.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

export default router;
