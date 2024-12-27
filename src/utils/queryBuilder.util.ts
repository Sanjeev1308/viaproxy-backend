import { Model } from 'mongoose';

interface QueryOptions {
  searchFields?: string[];
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  limit?: number;
}

export const queryBuilder = async (
  model: Model<any>,
  query: Record<string, any>,
  options: QueryOptions
) => {
  const {
    searchFields = [],
    filters = {},
    sort = '-createdAt',
    page = 1,
    limit = 10,
  } = options;

  // Initialize query conditions
  const conditions: Record<string, any> = {};

  // Search logic for contains (case-insensitive)
  if (query.search && searchFields.length > 0) {
    const searchRegex = new RegExp(query.search, 'i'); // Case-insensitive regex
    conditions.$or = searchFields.map((field) => ({
      [field]: searchRegex,
    }));
  }

  // Filtering logic
  for (const [key, value] of Object.entries(filters)) {
    if (query[key]) {
      conditions[key] = query[key];
    }
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Fetch data
  const data = await model.find(conditions).sort(sort).skip(skip).limit(limit);

  // Count total documents matching conditions
  const total = await model.countDocuments(conditions);

  return {
    data,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
};
