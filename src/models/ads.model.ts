import { Schema, model } from 'mongoose';
import { IAds } from '../interfaces/ads.interface';

const AdsSchema = new Schema<IAds>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    serviceType: {
      type: String,
      enum: ['service', 'product'],
      required: true,
    },
    concernedProductService: {
      type: String,
      required: false,
    },
    adsStartDate: {
      type: Date,
      required: true,
    },
    adsEndDate: {
      type: Date,
      required: true,
    },
    zone1: {
      type: Boolean,
      default: false,
    },
    zone2: {
      type: Boolean,
      default: false,
    },
    zone3: {
      type: Boolean,
      default: false,
    },
    zone1Image: {
      type: String,
    },
    zone2Image: {
      type: String,
    },
    zone3Image: {
      type: String,
    },

    country: { type: String, default: '' },
    city: { type: String, default: '' },
  },
  { timestamps: true }
);

export default model<IAds>('Ads', AdsSchema);
