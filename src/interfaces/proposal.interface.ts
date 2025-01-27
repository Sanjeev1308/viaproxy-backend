import mongoose, { Document } from 'mongoose';

export interface IProposal extends Document {
  offer: mongoose.Types.ObjectId;
  proposer: mongoose.Types.ObjectId;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
