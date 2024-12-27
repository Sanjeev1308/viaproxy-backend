import { Request, Response } from 'express';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from '../services/auth.service';

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const forgotPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await forgotPassword(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await resetPassword(token, newPassword);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyEmailHandler = async (req: Request, res: Response) => {
  try {
    const { email, otpCode } = req.body;
    const user = await verifyEmail(email, otpCode);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
