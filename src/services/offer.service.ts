import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import { IOffer } from '../interfaces/offer.interface';
import OfferModel from '../models/offer.model';
import { deleteFile } from '../utils/file.utils';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllOffers() {
  return await OfferModel.find();
}

export async function findAllOffersWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(OfferModel, query, queryOptions);
}

export async function findOfferById(id: string) {
  return await OfferModel.findById(id);
}

export async function findOffer(
  query: FilterQuery<IOffer>,
  options: QueryOptions = { lean: true }
): Promise<IOffer | null> {
  return await OfferModel.findOne(query, {}, options);
}

export async function createOffer(offerData: Partial<IOffer>) {
  try {
    const result = await OfferModel.create(offerData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateOfferById(
  id: string,
  update: UpdateQuery<IOffer>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await OfferModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteOfferById(id: string) {
  return await OfferModel.deleteOne({ _id: id });
}

export const findAndDeleteOfferById = async (id: string) => {
  try {
    // Find the document
    const document = await findOfferById(id);
    if (!document) {
      throw new NotFoundError('Offer not found', ErrorCode.NOT_FOUND);
    }

    // Delete the document
    await document.deleteOne();

    if (document.offerImage) {
      deleteFile(document.offerImage);
    }
    if (document.specialConditionsFile) {
      deleteFile(document.specialConditionsFile);
    }

    return document;
  } catch (error) {
    console.error(`Error deleting document with ID: ${id}`, error);
    throw new InternalServerError(
      `Failed to delete document with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
