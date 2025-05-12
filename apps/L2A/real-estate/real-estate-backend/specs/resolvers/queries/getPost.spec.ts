import { getPosts } from '../../../src/resolvers/queries';
import { POST_MODEL } from '../../../src/models/post';
jest.mock('../../../src/models/post', () => ({
  POST_MODEL: {
    find: jest.fn(),
  },
}));
describe('getPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all posts', async () => {
    const mockPosts = [
      { _id: '1', title: 'Test Post 1' },
      { _id: '2', title: 'Test Post 2' },
    ];
    (POST_MODEL.find as jest.Mock).mockResolvedValue(mockPosts);
    const result = await getPosts();
    expect(POST_MODEL.find).toHaveBeenCalled();
    expect(result).toEqual(mockPosts);
  });
  it('should return an empty array on error', async () => {
    (POST_MODEL.find as jest.Mock).mockRejectedValue(new Error('DB failure'));

    const result = await getPosts();

    expect(result).toEqual([]);
  });
});
