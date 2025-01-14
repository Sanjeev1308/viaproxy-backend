import { model, Schema } from 'mongoose';
import { IProposal } from '../interfaces/proposal.interface';

const ProposalSchema = new Schema<IProposal>(
  {
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    proposer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default model<IProposal>('Proposal', ProposalSchema);
