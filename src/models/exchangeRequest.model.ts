import { Schema, model } from 'mongoose';

const ExchangeRequestSchema = new Schema(
  {
    offerId: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default model('ExchangeRequest', ExchangeRequestSchema);
