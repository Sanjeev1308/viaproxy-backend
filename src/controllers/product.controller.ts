import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  createProduct,
  deleteProductById,
  findAllProductsWithQuery,
  findProductById,
  updateProductById,
} from '../services/product.service';

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const image = files['image']?.[0]?.path;

    const products = await createProduct({ ...productData, image });

    if (products.error) {
      res.status(400).json({ message: products.error, sucess: false });
    }
    res.status(201).json(products);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch Products',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllProductsHandler = async (req: Request, res: Response) => {
  try {
    const { search, page, limit, sort } = req.query;

    const queryOptions = {
      searchFields: ['name'],
      filters: {},
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      populate: ['productCategoryId', 'productSubCategoryId'],
    };

    const products = await findAllProductsWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: products.data,
      totalproducts: products.meta.total,
      totalPages: products.meta.pages,
      page: products.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch products',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getProductByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await findProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Product with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateProductByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const product = await updateProductById(id, data);
    if (!product) {
      throw new NotFoundError('Product not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Product with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteProductByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await deleteProductById(id);
    if (!product) {
      throw new NotFoundError('Product not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ product, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Product with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
