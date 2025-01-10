import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IAds } from '../interfaces/ads.interface';
import AdsModel from '../models/ads.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllAds() {
  return await AdsModel.find();
}

export async function findAllAdsWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(AdsModel, query, queryOptions);
}

export async function findAdsById(id: string) {
  return await AdsModel.findById(id);
}

export async function findAds(
  query: FilterQuery<IAds>,
  options: QueryOptions = { lean: true }
): Promise<IAds | null> {
  return await AdsModel.findOne(query, {}, options);
}

export async function createAds(AdsData: Partial<IAds>) {
  try {
    const result = await AdsModel.create(AdsData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateAdsById(
  id: string,
  update: UpdateQuery<IAds>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await AdsModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteAdsById(id: string) {
  return await AdsModel.deleteOne({ _id: id });
}
