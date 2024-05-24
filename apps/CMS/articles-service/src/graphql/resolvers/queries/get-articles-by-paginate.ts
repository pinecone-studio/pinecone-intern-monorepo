import { QueryResolvers } from '@/graphql/generated';
import { accessTokenAuth } from '@/middlewares/auth-token';
import { ArticleModel } from '@/models/article.model';
import { buildQueryFilter } from './build-query-filter';

type Payload = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
};

export const getArticlesByPaginate: QueryResolvers['getArticlesByPaginate'] = async (_, { paginationInput, filterInput }, { headers: { authorization } }) => {
  const { role, id } = (await accessTokenAuth({ authorization })) as Payload;
  const { limit, page } = paginationInput;
  const { status, searchedValue, startDate, endDate } = filterInput;

  const query = buildQueryFilter(id, role, status, searchedValue, startDate, endDate);

  const articles = await ArticleModel.find(query)
    .populate('author category')
    .limit(limit)
    .skip(limit * (page - 1));

  const totalArticles = await ArticleModel.find(query).countDocuments();

  return { articles, totalArticles };
};
