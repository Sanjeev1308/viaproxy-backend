import { Document } from 'mongoose';

export interface IUser extends Document {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  country?: string;
  city?: string;
  status?: string;
  designationSchool?: string;
  categorySchool?: string;
  implementation?: string;
  isActive: boolean;
  emailVerified: boolean;
  profilePicture?: string;
  otpCode: string;
  otpExpires: number;
  resetPasswordToken: string;
  resetPasswordExpires: number;
  role: 'admin' | 'student' | 'eco-citizen' | 'merchant';
}
