import { Document } from 'mongoose';

export interface IExchangeRequest extends Document {
  offerId: string;
  requesterId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
