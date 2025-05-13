import { deletePostById } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations';
import { POST_MODEL } from 'apps/L2A/real-estate/real-estate-backend/src/models/post';

jest.mock('apps/L2A/real-estate/real-estate-backend/src/models/post');

describe('deletePostById', () => {
  const mockPost = {
    _id: '123',
    title: 'Test post',
    content: 'Test content',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete and return the post if found', async () => {
    (POST_MODEL.findByIdAndDelete as jest.Mock).mockResolvedValue(mockPost);

    const result = await deletePostById(null, { _id: '123' });

    expect(POST_MODEL.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockPost);
  });

  it('should throw an error if post is not found', async () => {
    (POST_MODEL.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deletePostById(null, { _id: 'not-found-id' })).rejects.toThrow('Post not found');
    expect(POST_MODEL.findByIdAndDelete).toHaveBeenCalledWith('not-found-id');
  });
});
