import { updatePostById } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations';
import { POST_MODEL } from 'apps/L2A/real-estate/real-estate-backend/src/models/post';

jest.mock('apps/L2A/real-estate/real-estate-backend/src/models/post');

describe('updatePostById', () => {
  const mockPost = {
    _id: '123',
    title: 'Updated Title',
    content: 'Updated Content',
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update and return the post if found', async () => {
    (POST_MODEL.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockPost);

    const input = {
      title: 'Updated Title',
      content: 'Updated Content',
    };

    const result = await updatePostById(null, { _id: '123', input });

    expect(POST_MODEL.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      expect.objectContaining({
        title: 'Updated Title',
        content: 'Updated Content',
      }),
      { new: true }
    );

    expect(result).toEqual(mockPost);
  });

  it('should throw an error if post is not found', async () => {
    (POST_MODEL.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const input = {
      title: 'New title',
      content: 'New content',
    };

    await expect(updatePostById(null, { _id: 'not-found-id', input })).rejects.toThrow('Post not found');
  });
});
