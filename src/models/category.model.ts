import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import { IUser } from '../interfaces/user.interface';

const CategorySchema = new Schema<ICategory>(
  {
    categoryType: {
      type: String,
      enum: ['service', 'product'],
      default: 'service',
    },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isSubcategory: {
      type: Boolean,
      default: false,
    },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model<IUser>('Category', CategorySchema);
