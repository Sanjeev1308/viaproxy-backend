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
    advertisingAreas: {
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
        required: function () {
          return this.advertisingAreas.zone1;
        },
      },
      zone2Image: {
        type: String,
        required: function () {
          return this.advertisingAreas.zone2;
        },
      },
      zone3Image: {
        type: String,
        required: function () {
          return this.advertisingAreas.zone3;
        },
      },
    },
    geographicArea: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<IAds>('Ads', AdsSchema);
