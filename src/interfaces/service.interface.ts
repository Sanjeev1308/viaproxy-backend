import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description?: string;
  serviceCategoryId?: mongoose.Types.ObjectId;
  isActive: boolean;
}
