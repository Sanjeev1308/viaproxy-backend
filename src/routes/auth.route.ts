import express from 'express';
import {
  forgotPasswordHandler,
  loginUserHandler,
  registerUserHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';
import validateSchema from '../middlewares/validationSchema.middleware';
import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  verifyEmailSchema,
} from '../validations/auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateSchema(registerUserSchema),
  registerUserHandler
);
router.post(
  '/verify-email',
  validateSchema(verifyEmailSchema),
  verifyEmailHandler
);
router.post(
  '/forgot-password',
  validateSchema(forgotPasswordSchema),
  forgotPasswordHandler
);
// router.post('/reset-password', validateSchema(resetPasswordSchema), resetPasswordHandler);
router.post('/login', validateSchema(loginUserSchema), loginUserHandler);
// router.post("/change-password", validateSchema(changePasswordSchema), changePassword);

export default router;
