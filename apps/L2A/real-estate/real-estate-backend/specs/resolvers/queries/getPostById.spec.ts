import { getPostsById } from '../../../src/resolvers/queries';
import { POST_MODEL } from '../../../src/models/post';
import mongoose from 'mongoose';


jest.mock('../../../src/models/post', () => ({
  POST_MODEL: {
    find: jest.fn(),
  },
}));


jest.mock('mongoose', () => {
  const actual = jest.requireActual('mongoose');
  return {
    ...actual,
    Types: {
      ObjectId: jest.fn(),
    },
  };
});

describe('getPostsByUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return posts for a given propertyOwnerId', async () => {
    const mockPosts = [
      { _id: '1', title: 'Post 1' },
      { _id: '2', title: 'Post 2' },
    ];
    const mockObjectId = { toString: () => 'mocked-id', id: 'user123' };
    ((mongoose.Types.ObjectId as unknown) as jest.Mock).mockReturnValue(mockObjectId);
    (POST_MODEL.find as jest.Mock).mockResolvedValue(mockPosts);

    const propertyOwnerId = 'user123';
    const result = await getPostsById(null, { propertyOwnerId });

    expect(mongoose.Types.ObjectId).toHaveBeenCalledWith(propertyOwnerId);
    expect(POST_MODEL.find).toHaveBeenCalledWith({ propertyOwnerId: mockObjectId });
    expect(result).toEqual(mockPosts);
  });

  it('should return an empty array if an error occurs', async () => {
    (POST_MODEL.find as jest.Mock).mockRejectedValue(new Error('DB error'));
    const mockObjectId = { toString: () => 'mocked-id', id: 'bad-id' };
    ((mongoose.Types.ObjectId as unknown) as jest.Mock).mockReturnValue(mockObjectId);

    const result = await getPostsById(null, { propertyOwnerId: 'bad-id' });

    expect(mongoose.Types.ObjectId).toHaveBeenCalledWith('bad-id');
    expect(result).toEqual([]);
  });

  it('should return an empty array if ObjectId constructor throws', async () => {
    ((mongoose.Types.ObjectId as unknown) as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid ObjectId');
    });

    const result = await getPostsById(null, { propertyOwnerId: 'invalid-id' });

    expect(result).toEqual([]);
  });
});


