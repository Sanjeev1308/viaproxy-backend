import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, default: null },
    status: { type: String, default: '' },
    city: { type: String, default: null },
    designationSchool: { type: String, default: null },
    categorySchool: { type: String, default: null },
    implementation: { type: String, default: null },
    profilePicture: { type: String, default: null },
    role: {
      type: String,
      enum: ['admin', 'student', 'eco-citizen', 'merchant'],
      default: 'admin',
    },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    otpExpires: { type: Number, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Number, default: null },
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
