import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  createService,
  deleteServiceById,
  findAllServicesWithQuery,
  findServiceById,
  updateServiceById,
} from '../services/service.service';

export const createServiceHandler = async (req: Request, res: Response) => {
  try {
    const serviceData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const image = files['image']?.[0]?.path;

    const services = await createService({ ...serviceData, image });

    if (services.error) {
      res.status(400).json({ message: services.error, sucess: false });
    }
    res.status(201).json(services);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch Services',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllServicesHandler = async (req: Request, res: Response) => {
  try {
    const { search, page, limit, sort } = req.query;

    const queryOptions = {
      searchFields: ['name'],
      filters: {},
      sort: sort || '-createdAt',
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
    };

    const services = await findAllServicesWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: services.data,
      totalServices: services.meta.total,
      totalPages: services.meta.pages,
      page: services.meta.page,
      success: true,
    });
  } catch (error) {
    throw new InternalServerError(
      'Failed to fetch Services',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

// Get role by ID
export const getServiceByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await findServiceById(id);
    if (!service) {
      throw new NotFoundError('Service not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ service, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Service with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateServiceByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const service = await updateServiceById(id, data);
    if (!service) {
      throw new NotFoundError('Service not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ service, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Service with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteServiceByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await deleteServiceById(id);
    if (!service) {
      throw new NotFoundError('Service not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ service, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Service with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
