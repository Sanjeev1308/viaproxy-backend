import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    productCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IProduct>('Product', ProductSchema);
