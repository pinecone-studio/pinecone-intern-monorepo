import { updateArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models';
import { CategoryModel } from '@/models/category.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('@/models/category.model', () => ({
  CategoryModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('updateArticle resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const id = 'article_id_here';
  const articleInput = {
    title: 'Updated Article',
    content: 'Updated Content',
    category: 'Updated Category',
  };

  it('updates an article successfully', async () => {
    const category = { _id: 'category_id_here', name: 'Updated Category' };
    const mockUpdatedArticle = {
      _id: id,
      ...articleInput,
      category: [category],
    };

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(category);
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedArticle);

    const result = await updateArticle(undefined, { id, articleInput });

    expect(result).toEqual(mockUpdatedArticle);
    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(id, expect.objectContaining({ ...articleInput, category: [category] }), { new: true });
  });

  it('creates a new category if not found and updates the article', async () => {
    const category = { _id: 'category_id_here', name: 'Updated Category' };
    const mockUpdatedArticle = {
      _id: id,
      ...articleInput,
      category: [category],
    };

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(null);
    (CategoryModel.create as jest.Mock).mockResolvedValue(category);
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedArticle);

    const result = await updateArticle(undefined, { id, articleInput });

    expect(result).toEqual(mockUpdatedArticle);
    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: articleInput.category });
    expect(CategoryModel.create).toHaveBeenCalledWith({ name: articleInput.category });
    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(id, expect.objectContaining({ ...articleInput, category: [category] }), { new: true });
  });

  it('throws an error when article is not found', async () => {
    (CategoryModel.findOne as jest.Mock).mockResolvedValue({ _id: 'category_id_here', name: 'Updated Category' });
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateArticle(undefined, { id, articleInput })).rejects.toThrow(GraphQLError);
    await expect(updateArticle(undefined, { id, articleInput })).rejects.toThrow('Failed to update article');

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(id, expect.objectContaining({ ...articleInput, category: [{ _id: 'category_id_here', name: 'Updated Category' }] }), { new: true });
  });

  it('throws a generic error when update fails', async () => {
    const errorMessage = 'Database error';
    const mockError = new Error(errorMessage);

    (CategoryModel.findOne as jest.Mock).mockResolvedValue({ _id: 'category_id_here', name: 'Updated Category' });
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

    await expect(updateArticle(undefined, { id, articleInput })).rejects.toThrow(GraphQLError);
    await expect(updateArticle(undefined, { id, articleInput })).rejects.toThrow('Failed to update article');

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(id, expect.objectContaining({ ...articleInput, category: [{ _id: 'category_id_here', name: 'Updated Category' }] }), { new: true });
  });
});
