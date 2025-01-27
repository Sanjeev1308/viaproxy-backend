import { Document } from 'mongoose';

export interface IAds extends Document {
  name: string;
  description?: string;
  serviceType: 'service' | 'product';
  concernedProductService?: string;
  adsStartDate: Date;
  adsEndDate: Date;
  zone1?: boolean;
  zone2?: boolean;
  zone3?: boolean;
  zone1Image?: string;
  zone2Image?: string;
  zone3Image?: string;
  country?: string;
  city?: string;
}
