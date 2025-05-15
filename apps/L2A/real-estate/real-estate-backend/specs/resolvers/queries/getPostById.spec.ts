import { getPostById } from '../../../src/resolvers/queries';
import { POST_MODEL } from '../../../src/models/post';
import mongoose from 'mongoose';

jest.mock('../../../src/models/post', () => ({
  POST_MODEL: {
    findOne: jest.fn(),
  },
}));

describe('getPostById', () => {
  const mockId = new mongoose.Types.ObjectId().toHexString();
  const mockPost = {
    _id: mockId,
    title: 'Test Post',
    description: 'Mock Description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return post when found', async () => {
    (POST_MODEL.findOne as jest.Mock).mockResolvedValue(mockPost);

    const result = await getPostById({}, { _id: mockId });

    expect(POST_MODEL.findOne).toHaveBeenCalledWith({ _id: new mongoose.Types.ObjectId(mockId) });
    expect(result).toEqual(mockPost);
  });

  it('should return null when no post found', async () => {
    (POST_MODEL.findOne as jest.Mock).mockResolvedValue(null);

    const result = await getPostById({}, { _id: mockId });

    expect(result).toBeNull();
  });

  it('should return null and log error when exception occurs', async () => {
    const error = new Error('DB Error');
    (POST_MODEL.findOne as jest.Mock).mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0);
    const result = await getPostById({}, { _id: mockId });
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(result).toBeNull();
    consoleSpy.mockRestore();
  });
  
  });



