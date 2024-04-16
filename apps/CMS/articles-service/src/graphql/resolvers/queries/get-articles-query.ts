import { ArticleModel } from '@/models/article.model';

export const getArticlesQuery = async () => {
  const articles = await ArticleModel.find({}).populate('category').populate('author');
  return articles;
};
