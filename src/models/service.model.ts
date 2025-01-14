import { Schema, model } from 'mongoose';
import { IService } from '../interfaces/service.interface';

const ServiceSchema = new Schema<IService>(
  {
    image: { type: String, default: '' },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    serviceCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    serviceSubCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: { type: Boolean, default: true },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model<IService>('Service', ServiceSchema);
