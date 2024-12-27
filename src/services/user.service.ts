import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import { queryBuilder } from '../utils/queryBuilder.util';

export async function findAllUsers() {
  return await UserModel.find();
}

export async function findAllUsersWithQuery(query: any, queryOptions: any) {
  return await queryBuilder(UserModel, query, queryOptions);
}

export async function findUserById(id: string) {
  return await UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
  return await UserModel.findOne({ email: email });
}

export async function findUser(
  query: FilterQuery<IUser>,
  options: QueryOptions = { lean: true }
): Promise<IUser | null> {
  return await UserModel.findOne(query, {}, options);
}

export async function createUser(userData: Partial<IUser>) {
  try {
    const result = await UserModel.create(userData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateUserById(
  id: string,
  update: UpdateQuery<IUser>,
  options: QueryOptions = { new: true }
) {
  try {
    const result = await UserModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function deleteUserById(id: string) {
  return await UserModel.deleteOne({ _id: id });
}
