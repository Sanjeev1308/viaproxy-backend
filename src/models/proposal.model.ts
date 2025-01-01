import { model, Schema } from 'mongoose';

const ProposalSchema = new Schema(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    proposer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    proposedOffer: { type: Schema.Types.ObjectId, ref: 'Offer' },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default model('Proposal', ProposalSchema);
