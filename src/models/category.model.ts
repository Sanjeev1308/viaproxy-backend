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
  },
  { timestamps: true }
);

export default model<IUser>('Category', CategorySchema);
