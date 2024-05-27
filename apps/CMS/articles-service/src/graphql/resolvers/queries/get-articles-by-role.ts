import { QueryResolvers } from '@/graphql/generated';
import { accessTokenAuth } from '@/middlewares/auth-token';
import { ArticleModel } from '@/models';

type QueryType = {
  author?: string;
};
type Payload = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
};
const builtFilter = (id: string | undefined, role: string): QueryType => {
  const query: QueryType = {};
  if (role !== 'admin' && id) {
    query.author = id;
  }
  return query;
};

export const getArticlesByRole: QueryResolvers['getArticlesByRole'] = async (_, __, { headers: { authorization } }) => {
  const { role, id } = (await accessTokenAuth({ authorization })) as Payload;
  const query = builtFilter(id, role);
  const articles = await ArticleModel.find(query).populate('category author');
  return articles;
};
