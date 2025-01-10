import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  productCategoryId?: mongoose.Types.ObjectId;
  isActive: boolean;
}
