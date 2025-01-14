import { Request, Response } from 'express';
import { ErrorCode } from '../errors/custom.error';
import InternalServerError from '../errors/internalServer.error';
import NotFoundError from '../errors/notFound.error';
import {
  createAds,
  deleteAdsById,
  findAdsById,
  findAllAdsWithQuery,
  updateAdsById,
} from '../services/ads.service';

export const createAdsHandler = async (req: Request, res: Response) => {
  try {
    const adsData = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const zone1Image = files['zone1Image']?.[0]?.path;
    const zone2Image = files['zone2Image']?.[0]?.path;
    const zone3Image = files['zone3Image']?.[0]?.path;

    const ads = await createAds({
      ...adsData,
      zone1Image,
      zone2Image,
      zone3Image,
    });

    if (ads.error) {
      res.status(400).json({ message: ads.error, sucess: false });
    }
    res.status(201).json(ads);
  } catch (error: any) {
    throw new InternalServerError(
      'Failed to fetch Ads',
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const getAllAdsHandler = async (req: Request, res: Response) => {
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

    const ads = await findAllAdsWithQuery(req.query, queryOptions);
    res.status(200).json({
      data: ads.data,
      totalads: ads.meta.total,
      totalPages: ads.meta.pages,
      page: ads.meta.page,
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
export const getAdsByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ads = await findAdsById(id);
    if (!ads) {
      throw new NotFoundError('Ads not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ ads, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Ads with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const updateAdsByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const ads = await updateAdsById(id, data);
    if (!ads) {
      throw new NotFoundError('Ads not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ ads, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Ads with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};

export const deleteAdsByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ads = await deleteAdsById(id);
    if (!ads) {
      throw new NotFoundError('Ads not found', ErrorCode.NOT_FOUND);
    }

    res.status(200).json({ ads, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch Ads with ID: ${id}`,
      ErrorCode.INTERNAL_SERVER
    );
  }
};
