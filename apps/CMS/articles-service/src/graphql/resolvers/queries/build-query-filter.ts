type QueryType = {
  author?: string;
  status?: { $regex: string; $options: string };
  title?: { $regex: string; $options: string };
  createdAt?: { $gte: Date; $lte: Date };
};

const addAuthorFilter = (query: QueryType, id: string | undefined, role: string) => {
  if (role !== 'admin' && id) {
    query.author = id;
  }
};

const addStatusFilter = (query: QueryType, status: string | undefined) => {
  if (status) {
    query.status = { $regex: status, $options: 'i' };
  }
};

const addTitleFilter = (query: QueryType, searchedValue: string | undefined) => {
  if (searchedValue) {
    query.title = { $regex: searchedValue, $options: 'i' };
  }
};

const addDateFilter = (query: QueryType, startDate: Date | null, endDate: Date | null) => {
  if (startDate && endDate) {
    query.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }
};

export const buildQueryFilter = (id: string | undefined, role: string, status: string | undefined, searchedValue: string | undefined, startDate: Date | null, endDate: Date | null): QueryType => {
  const query: QueryType = {};

  addAuthorFilter(query, id, role);
  addStatusFilter(query, status);
  addTitleFilter(query, searchedValue);
  addDateFilter(query, startDate, endDate);

  return query;
};
