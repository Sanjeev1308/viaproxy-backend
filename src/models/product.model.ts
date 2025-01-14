import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema = new Schema<IProduct>(
  {
    image: { type: String, default: '' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    productCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    productSubCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: { type: Boolean, default: true },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model<IProduct>('Product', ProductSchema);
