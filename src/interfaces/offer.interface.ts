import mongoose, { Document } from 'mongoose';

export interface IOffer extends Document {
  offerTitle: string;
  proposedItem: 'service' | 'product' | 'buy';
  concernedProductService?: string;
  description: string;
  offerImage: string | File;
  offerStartDate: Date;
  offerEndDate: Date;
  exchangeType: 'exchange' | 'sale' | 'donate';
  paymentType: 'lump sum' | 'per day' | 'per hour';
  estimatedPrice: number;
  paymentMethod:
    | 'delivered'
    | 'hand to hand'
    | 'paid on collection'
    | 'delivered after payment';
  geographicArea: string;
  city: string;
  campus?: string;
  specialConditionsFile?: string | File;
  deliveryTermsDescription: string;
  termsAndConditions?: string;
  status: 'pending' | 'completed' | 'expired' | 'cancelled';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
