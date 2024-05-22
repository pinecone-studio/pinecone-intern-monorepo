import { QueryResolvers } from '@/graphql/generated';
import { ArticleModel } from '@/models/article.model';

const buildQuery = (status: string | undefined, searchedValue: string | undefined, startDate: Date | null, endDate: Date | null) => {
  if (startDate === null || endDate === null) {
    return { status: { $regex: status, $options: 'i' }, title: { $regex: searchedValue, $options: 'i' } };
  } else {
    return {
      status: { $regex: status, $options: 'i' },
      title: { $regex: searchedValue, $options: 'i' },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    };
  }
};

export const getArticlesByPaginate: QueryResolvers['getArticlesByPaginate'] = async (_, { paginationInput, filterInput }) => {
  const { limit, page } = paginationInput;
  const { status, searchedValue, startDate, endDate } = filterInput;
  const query = buildQuery(status, searchedValue, startDate, endDate);

  const articles = await ArticleModel.find(query)
    .populate('author category')
    .limit(limit)
    .skip(limit * (page - 1));

  const totalArticles = await ArticleModel.find(query).countDocuments();

  return { articles, totalArticles };
};
