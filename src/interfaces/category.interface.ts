import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document {
  categoryType: 'service' | 'product';
  name: string;
  description?: string;
  parentCategoryId?: mongoose.Types.ObjectId;
  isSubcategory: boolean;
  country?: string;
  city?: string;
}
