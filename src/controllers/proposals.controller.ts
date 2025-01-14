import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import { AuthRequest } from '../middlewares/auth.middleware';
import OfferModel from '../models/offer.model';
import {
  createProposal,
  deleteProposalById,
  findAllProposalsWithQuery,
  findProposalById,
  updateProposalById,
} from '../services/proposals.service';

export const createProposalHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const proposalData = req.body;

    // const proposerId = new mongoose.Types.ObjectId(req.user?.id);
    // const offerId = new mongoose.Types.ObjectId(proposalData.offer);

    // const alreadyProposed = await findProposal({
    //   proposer: proposerId,
    //   offer: offerId,
    // });

    // if (alreadyProposed) {
    //   res.status(401).json({ message: 'Already proposed', sucess: false });
    // }

    const proposals = await createProposal(proposalData);

    if (proposals.error) {
      res.status(400).json({ message: proposals.error, sucess: false });
    }
    res.status(201).json(proposals);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch proposals',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllMineProposalsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { search, page, limit, sort } = req.query;

    const queryOptions = {
      searchFields: ['message'],
      filters: { proposer: { $eq: req.user?._id as any } },
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      populate: ['proposer'],
    };

    const proposals = await findAllProposalsWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: proposals.data,
      totalproposals: proposals.meta.total,
      totalPages: proposals.meta.pages,
      page: proposals.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch offers',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllRecivedProposalsHandler = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { search, page, limit, sort } = req.query;

    const userOffers = await OfferModel.find({
      createdBy: req.user?._id,
    }).select('_id');

    const offerIds = userOffers.map((offer) => offer._id);

    const queryOptions = {
      searchFields: ['message'],
      filters: { offer: { $in: offerIds } },
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      populate: ['proposer'],
    };

    const proposals = await findAllProposalsWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: proposals.data,
      totalproposals: proposals.meta.total,
      totalPages: proposals.meta.pages,
      page: proposals.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch offers',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getProposalByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const proposal = await findProposalById(id);
    if (!proposal) {
      throw new NotFoundError('proposal not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ proposal, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch proposal with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateProposalByIdHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const proposal = await updateProposalById(id, data);
    if (!proposal) {
      throw new NotFoundError('proposal not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ proposal, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch proposal with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteProposalByIdHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const proposal = await deleteProposalById(id);
    if (!proposal) {
      throw new NotFoundError('proposal not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ proposal, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch proposal with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
