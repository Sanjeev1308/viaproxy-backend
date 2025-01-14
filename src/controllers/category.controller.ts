import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  createCategory,
  deleteCategoryById,
  findAllCategoriesWithQuery,
  findCategoryById,
  updateCategoryById,
} from '../services/category.service';

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;

    const categories = await createCategory({
      ...categoryData,
      isSubcategory: !!categoryData.parentCategoryId,
    });

    if (categories.error) {
      res.status(400).json({ message: categories.error, sucess: false });
    }
    res.status(201).json(categories);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch categories',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { search, page, limit, sort, categoryType, isSubcategory } =
      req.query;

    const queryOptions = {
      searchFields: ['name'],
      filters: { categoryType, isSubcategory },
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
    };

    const categories = await findAllCategoriesWithQuery(
      req.query,
      queryOptions
    );
    res.status(200).json({
      data: categories.data,
      totalCategories: categories.meta.total,
      totalPages: categories.meta.pages,
      page: categories.meta.page,
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
export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await findCategoryById(id);
    if (!category) {
      throw new NotFoundError('category not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ category, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch category with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getSubCategoriesByCategoryIdHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const { search, page, limit, sort } = req.query;

    const queryOptions = {
      searchFields: ['name'],
      filters: {
        isSubcategory: true,
        parentCategoryId: {
          $eq: id,
        },
      },
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
    };

    const categories = await findAllCategoriesWithQuery(
      req.query,
      queryOptions
    );

    if (!categories) {
      res.status(401).json({ message: categories });
    }
    res.status(200).json({
      data: categories.data,
      totalCategories: categories.meta.total,
      totalPages: categories.meta.pages,
      page: categories.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch offers',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateCategoryByIdHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const category = await updateCategoryById(id, data);
    if (!category) {
      throw new NotFoundError('category not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ category, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch category with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteCategoryByIdHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const category = await deleteCategoryById(id);
    if (!category) {
      throw new NotFoundError('category not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ category, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch category with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
