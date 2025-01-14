import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IProposal } from '../interfaces/proposal.interface';
import ProposalModel from '../models/proposal.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllProposals() {
  return await ProposalModel.find();
}

export async function findAllProposalsWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(ProposalModel, query, queryOptions);
}

export async function findProposalById(id: string) {
  return await ProposalModel.findById(id);
}

export async function findProposal(
  query: FilterQuery<IProposal>,
  options: QueryOptions = { lean: true }
): Promise<IProposal | null> {
  return await ProposalModel.findOne(query, {}, options);
}

export async function createProposal(ProposalData: Partial<IProposal>) {
  try {
    const result = await ProposalModel.create(ProposalData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateProposalById(
  id: string,
  update: UpdateQuery<IProposal>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await ProposalModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteProposalById(id: string) {
  return await ProposalModel.deleteOne({ _id: id });
}
