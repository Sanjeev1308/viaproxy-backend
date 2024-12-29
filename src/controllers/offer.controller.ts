import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  createOffer,
  findAllOffersWithQuery,
  findAndDeleteOfferById,
  findOfferById,
  updateOfferById,
} from '../services/offer.service';

export const createOfferHandler = async (req: Request, res: Response) => {
  try {
    const offerData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const offerImage = files['offerImage']?.[0]?.path;
    const specialConditionsFile = files['specialConditionsFile']?.[0]?.path;

    if (!offerImage) {
      res.status(400).json({ message: 'Offer image is required' });
    }
    const offer = await createOffer({
      ...offerData,
      offerImage,
      specialConditionsFile,
    });

    if (offer.error) {
      res.status(400).json({ message: offer.error, sucess: false });
    }
    res.status(201).json(offer);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch users',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllOffersHandler = async (req: Request, res: Response) => {
  try {
    const { search, page, limit, role, isActive } = req.query;
    const queryOptions = {
      searchFields: ['firstName', 'email'],
      filters: { role, isActive },
      sort: '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
    };

    const offers = await findAllOffersWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: offers.data,
      totaloffers: offers.meta.total,
      totalPages: offers.meta.pages,
      page: offers.meta.page,
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
export const getOfferByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const offer = await findOfferById(id);
    if (!offer) {
      throw new NotFoundError('Offer not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ offer, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch offer with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateOfferByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const offerImage = files['offerImage']?.[0]?.path;
    const specialConditionsFile = files['specialConditionsFile']?.[0]?.path;

    const offer = await updateOfferById(id, {
      ...data,
      offerImage,
      specialConditionsFile,
    });
    if (!offer) {
      throw new NotFoundError('Offer not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ offer, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch offer with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteOfferByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const offer = await findAndDeleteOfferById(id);
    if (!offer) {
      throw new NotFoundError('Offer not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ offer, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch offer with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
