import { createArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models/article.model';
import { CategoryModel } from '@/models/category.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/article.model', () => ({
  ArticleModel: {
    create: jest.fn(),
  },
}));

jest.mock('@/models/category.model', () => ({
  CategoryModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('createArticle resolver', () => {
  const articleInput = {
    title: 'New Article',
    content: 'New Content',
    category: 'Tech',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an article successfully with an existing category', async () => {
    const mockCategory = {
      _id: 'category_id_here',
      name: 'Tech',
    };
    const mockArticle = {
      _id: 'article_id_here',
      title: 'New Article',
      content: 'New Content',
      category: [mockCategory],
    };

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(mockCategory);
    (ArticleModel.create as jest.Mock).mockResolvedValue(mockArticle);

    const result = await createArticle(undefined, { articleInput });

    expect(result).toEqual(mockArticle);
    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: articleInput.category });
    expect(ArticleModel.create).toHaveBeenCalledWith({
      ...articleInput,
      category: [mockCategory],
    });
  });

  it('creates an article successfully with a new category', async () => {
    const mockCategory = {
      _id: 'new_category_id_here',
      name: 'Tech',
    };
    const mockArticle = {
      _id: 'article_id_here',
      title: 'New Article',
      content: 'New Content',
      category: [mockCategory],
    };

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(null);
    (CategoryModel.create as jest.Mock).mockResolvedValue(mockCategory);
    (ArticleModel.create as jest.Mock).mockResolvedValue(mockArticle);

    const result = await createArticle(undefined, { articleInput });

    expect(result).toEqual(mockArticle);
    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: articleInput.category });
    expect(CategoryModel.create).toHaveBeenCalledWith({ name: articleInput.category });
    expect(ArticleModel.create).toHaveBeenCalledWith({
      ...articleInput,
      category: [mockCategory],
    });
  });

  it('throws a GraphQLError when creation fails', async () => {
    const mockCategory = {
      _id: 'category_id_here',
      name: 'Tech',
    };
    const errorMessage = 'article not found';
    const mockError = new Error(errorMessage);

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(mockCategory);
    (ArticleModel.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createArticle(undefined, { articleInput })).rejects.toThrow(GraphQLError);
    await expect(createArticle(undefined, { articleInput })).rejects.toThrow('Failed to create article');

    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: articleInput.category });
    expect(ArticleModel.create).toHaveBeenCalledWith({
      ...articleInput,
      category: [mockCategory],
    });
  });

  it('throws a GraphQLError when newArticle is undefined', async () => {
    const mockCategory = {
      _id: 'category_id_here',
      name: 'Tech',
    };

    (CategoryModel.findOne as jest.Mock).mockResolvedValue(mockCategory);
    (ArticleModel.create as jest.Mock).mockResolvedValue(undefined);

    await expect(createArticle(undefined, { articleInput })).rejects.toThrow(GraphQLError);
    await expect(createArticle(undefined, { articleInput })).rejects.toThrow('Failed to create article');

    expect(CategoryModel.findOne).toHaveBeenCalledWith({ name: articleInput.category });
    expect(ArticleModel.create).toHaveBeenCalledWith({
      ...articleInput,
      category: [mockCategory],
    });
  });
});
