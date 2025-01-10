import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IService } from '../interfaces/service.interface';
import ServiceModel from '../models/service.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllServices() {
  return await ServiceModel.find();
}

export async function findAllServicesWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(ServiceModel, query, queryOptions);
}

export async function findServiceById(id: string) {
  return await ServiceModel.findById(id);
}

export async function findService(
  query: FilterQuery<IService>,
  options: QueryOptions = { lean: true }
): Promise<IService | null> {
  return await ServiceModel.findOne(query, {}, options);
}

export async function createService(ServiceData: Partial<IService>) {
  try {
    const result = await ServiceModel.create(ServiceData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateServiceById(
  id: string,
  update: UpdateQuery<IService>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await ServiceModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteServiceById(id: string) {
  return await ServiceModel.deleteOne({ _id: id });
}
