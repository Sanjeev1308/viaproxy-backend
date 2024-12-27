import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateEnv } from '../config/env.config';
import BadRequestError from '../errors/badRequest.error';
import { ErrorCode } from '../errors/custom.error';
import ForbiddenError from '../errors/forbidden.error';
import User from '../models/user.model';
import { sendEmail } from '../utils/email.util';
import { signJwt } from '../utils/jwt.util';
import { findUser } from './user.service';

export const registerUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 3600000; // 1 hour

  user.otpCode = otpCode;
  user.otpExpires = otpExpires;
  const savedUser = await user.save();

  // Send OTP for email verification
  await sendEmail(
    savedUser.email,
    'Verify your email',
    `Your OTP code is: ${otpCode}`
  );
  return savedUser;
};

export const loginUser = async (data: any) => {
  const { password, email } = data;

  // Find user by email
  const user = await findUser({ email }, { select: '+password', lean: true });
  if (!user)
    throw new ForbiddenError('User does not exist', ErrorCode.FORBIDDEN);
  if (!user.isActive)
    throw new BadRequestError(
      'Please verify your email first',
      ErrorCode.BAD_REQUEST
    );

  const secretKey = validateEnv()?.jwtconfig.accessSecret;

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new ForbiddenError('Invalid credentials', ErrorCode.FORBIDDEN);

  // Generate and store access token
  const accessToken = signJwt({ userId: user._id }, secretKey as string, {
    expiresIn: '3d',
  });

  return {
    accessToken,
  };
};

export const verifyEmail = async (email: string, otpCode: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  if (user.otpCode !== otpCode || user.otpExpires < Date.now()) {
    throw new Error('Invalid or expired OTP code');
  }

  user.emailVerified = true;
  user.otpCode = '';
  user.otpExpires = 0;
  await user.save();

  return user;
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const jwtconfig = validateEnv()?.jwtconfig;

  const token = jwt.sign({ id: user.id }, jwtconfig?.accessSecret || '', {
    expiresIn: '1h',
  });
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendEmail(
    user.email,
    'Reset Password',
    `Click here to reset: ${resetLink}`
  );
};

export const resetPassword = async (token: string, newPassword: string) => {
  const jwtconfig = validateEnv()?.jwtconfig;
  const decoded: any = jwt.verify(token, jwtconfig?.accessSecret || '');
  const user = await User.findById(decoded.id);

  if (!user || user.resetPasswordExpires < Date.now()) {
    throw new Error('Token is invalid or has expired');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = '';
  user.resetPasswordExpires = 0;
  await user.save();

  return user;
};
