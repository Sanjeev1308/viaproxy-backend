import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  image?: string;
  name: string;
  description?: string;
  serviceCategoryId?: mongoose.Types.ObjectId;
  serviceSubCategoryId?: mongoose.Types.ObjectId;
  isActive: boolean;
  country?: string;
  city?: string;
}
