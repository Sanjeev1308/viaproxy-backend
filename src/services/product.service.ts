import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
import ProductModel from '../models/product.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllProducts() {
  return await ProductModel.find();
}

export async function findAllProductsWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(ProductModel, query, queryOptions);
}

export async function findProductById(id: string) {
  return await ProductModel.findById(id);
}

export async function findProduct(
  query: FilterQuery<IProduct>,
  options: QueryOptions = { lean: true }
): Promise<IProduct | null> {
  return await ProductModel.findOne(query, {}, options);
}

export async function createProduct(ProductData: Partial<IProduct>) {
  try {
    const result = await ProductModel.create(ProductData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateProductById(
  id: string,
  update: UpdateQuery<IProduct>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await ProductModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteProductById(id: string) {
  return await ProductModel.deleteOne({ _id: id });
}
