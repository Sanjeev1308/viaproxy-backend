import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import CategoryModel from '../models/category.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllCategories() {
  return await CategoryModel.find();
}

export async function findAllCategoriesWithQuery(
  query: any,
  queryOptions: any
) {
  return await queryBuilder(CategoryModel, query, queryOptions);
}

export async function findCategoryById(id: string) {
  return await CategoryModel.findById(id);
}

export async function findCategory(
  query: FilterQuery<ICategory>,
  options: QueryOptions = { lean: true }
): Promise<ICategory | null> {
  return await CategoryModel.findOne(query, {}, options);
}

export async function createCategory(categoryData: Partial<ICategory>) {
  try {
    const result = await CategoryModel.create(categoryData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateCategoryById(
  id: string,
  update: UpdateQuery<ICategory>,
  options: QueryOptions = { new: true, runValidators: true }
) {
  try {
    const result = await CategoryModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteCategoryById(id: string) {
  return await CategoryModel.deleteOne({ _id: id });
}
