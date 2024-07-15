import { updateArticle } from '@/graphql/resolvers/mutations';
import { ArticleModel } from '@/models/articles.model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/articles.model', () => ({
  ArticleModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateArticle resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates an article successfully', async () => {
    const _id = 'article_id_here';
    const articleInput = {
      _id,
      title: 'Updated Article',
      content: 'Updated Content',
    };

    const mockUpdatedArticle = {
      _id,
      ...articleInput,
    };

    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedArticle);

    const result = await updateArticle(undefined, { _id, input: articleInput });

    expect(result).toEqual(mockUpdatedArticle);

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(_id, expect.objectContaining(articleInput), { new: true });
  });

  it('throws an error when article is not found', async () => {
    const _id = 'article_id_here';
    const articleInput = {
      _id,
      title: 'Updated Article',
      content: 'Updated Content',
    };

    (ArticleModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    try {
      await updateArticle(undefined, { _id, input: articleInput });
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.message).toBe('Could not find article to update');
    }

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(_id, expect.objectContaining(articleInput), { new: true });
  });

  it('throws a generic error when update fails', async () => {
    const _id = 'article_id_here';
    const articleInput = {
      _id,
      title: 'Updated Article',
      content: 'Updated Content',
    };

    const errorMessage = 'Database error';
    const mockError = new Error(errorMessage);
    (ArticleModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

    try {
      await updateArticle!({}, { _id, input: articleInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.message).toBe('Could not find article to update');
    }

    expect(ArticleModel.findByIdAndUpdate).toHaveBeenCalledWith(_id, expect.objectContaining(articleInput), { new: true });
  });
});
