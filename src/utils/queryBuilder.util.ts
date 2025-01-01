import { Model } from 'mongoose';

interface QueryOptions {
  searchFields?: string[]; // Fields to apply search on
  filters?: Record<string, any>; // Additional filter conditions
  sort?: string; // Sorting order
  page?: number; // Current page
  limit?: number; // Number of results per page
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
      [field]: { $regex: searchRegex },
    }));
  }

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      conditions[key] = value;
    }
  });

  // Pagination
  const skip = (page - 1) * limit;

  // Fetch data and total count in parallel for better performance
  const [data, total] = await Promise.all([
    model.find(conditions).sort(sort).skip(skip).limit(limit),
    model.countDocuments(conditions),
  ]);

  // Ensure the response includes meta details
  return {
    data,
    meta: {
      total, // Total number of matching documents
      page, // Current page number
      pages: Math.ceil(total / limit), // Total number of pages
    },
  };
};
