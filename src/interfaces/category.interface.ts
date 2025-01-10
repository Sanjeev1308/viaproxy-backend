import { Document } from 'mongoose';

export interface ICategory extends Document {
  categoryType: 'service' | 'product';
  name: string;
  description?: string;
}
