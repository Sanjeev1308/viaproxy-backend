import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  deleteUserById,
  findAllUsersWithQuery,
  findUserById,
  updateUserById,
} from '../services/user.service';

export const getAllUsersHandler = async (req: Request, res: Response) => {
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

    const users = await findAllUsersWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: users.data,
      totalUsers: users.meta.total,
      totalPages: users.meta.pages,
      page: users.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch users',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new NotFoundError('User not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch user with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await updateUserById(id, data);
    if (!user) {
      throw new NotFoundError('User not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch user with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await deleteUserById(id);
    if (!user) {
      throw new NotFoundError('User not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch user with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
