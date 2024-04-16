import { articleModel } from '../../../models/article.model';

export const articleQuery = () => {
  return 'Nice Greeting from Article 🔥';
};

export const getAllArticles = async () => {
  try {
    const allArticles = await articleModel.find({});
    return allArticles;
  } catch (error) {
    console.error(error);
    throw new Error('cannot fetch all articles from database');
  }
};
