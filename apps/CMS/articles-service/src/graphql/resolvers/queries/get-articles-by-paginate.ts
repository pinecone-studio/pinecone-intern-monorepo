import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';

export const getArticlesByPaginate: QueryResolvers['getArticlesByPaginate'] = async (_, { paginationInput, filterInput }) => {
  const { limit, page } = paginationInput;
  const { status, searchedValue } = filterInput;

  const articles = await ArticleModel.find({ status: { $regex: status, $options: 'i' }, title: { $regex: searchedValue, $options: 'i' } })
    .populate('author category')
    .limit(limit)
    .skip(limit * (page - 1));

  const totalArticles = await ArticleModel.find({ status: { $regex: status, $options: 'i' }, title: { $regex: searchedValue, $options: 'i' } }).countDocuments();

  return { articles, totalArticles };
};
