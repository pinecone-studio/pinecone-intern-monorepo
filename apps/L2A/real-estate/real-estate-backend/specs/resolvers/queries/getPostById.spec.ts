import { getPostById } from '../../../src/resolvers/queries/get-post-by-id';
import { POST_MODEL } from '../../../src/models/post';
import mongoose from 'mongoose';

jest.mock('../../models/post', () => ({
  POST_MODEL: {
    find: jest.fn(),
  },
}));

describe('getPostsById', () => {
  const mockObjectId = new mongoose.Types.ObjectId().toHexString();
  const mockPost = { _id: mockObjectId, title: 'Test Post' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts when given a valid ID', async () => {
    (POST_MODEL.find as jest.Mock).mockResolvedValue([mockPost]);

    const result = await getPostById({}, { _id: mockObjectId });

    expect(POST_MODEL.find).toHaveBeenCalledWith({ _id: new mongoose.Types.ObjectId(mockObjectId) });
    expect(result).toEqual([mockPost]);
  });

  it('should return an empty array and log error on failure', async () => {
    const error = new Error('Database error');
    (POST_MODEL.find as jest.Mock).mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getPostById({}, { _id: mockObjectId });

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(result).toEqual([]);

    consoleSpy.mockRestore();
  });
});