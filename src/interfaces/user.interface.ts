import { Document } from 'mongoose';

export interface IUser extends Document {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  country?: string;
  city?: string;
  school?: string;
  category?: string;
  isActive: boolean;
  emailVerified: boolean;
  profilePicture?: string;
  otpCode: string;
  otpExpires: number;
  resetPasswordToken: string;
  resetPasswordExpires: number;
  role: 'admin' | 'student' | 'eco-citizen' | 'merchant';
}
