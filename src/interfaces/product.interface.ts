import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  image?: string;
  name: string;
  description?: string;
  productCategoryId?: mongoose.Types.ObjectId;
  productSubCategoryId?: mongoose.Types.ObjectId;
  isActive: boolean;
  country?: string;
  city?: string;
}
