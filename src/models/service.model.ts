import { Schema, model } from 'mongoose';
import { IService } from '../interfaces/service.interface';

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    serviceCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IService>('Service', ServiceSchema);
