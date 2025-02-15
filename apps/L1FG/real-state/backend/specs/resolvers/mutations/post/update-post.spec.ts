import { updatePost } from '../../../../src/resolvers/mutations/post/update-post';
import { Post } from '../../../../src/models/post-model';
import { PostStats } from '../../../../src/generated';

jest.mock('../../../../src/models/post-model');

describe('updatePost resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update post with given id and input', async () => {
    // Mock data
    const mockId = 'test-id';
    const mockInput = {
      title: 'Updated Title',
      price: '200000',
      status: PostStats.Pending,
      propertyDetail: {
        houseType: 'Apartment',
        size: '150',
        totalRooms: 4,
      },
    };

    const mockUpdatedPost = {
      _id: mockId,
      ...mockInput,
    };

    // Mock the findByIdAndUpdate method
    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedPost);

    // Execute resolver
    const result = await updatePost(null, { _id: mockId, input: mockInput }, null, null);

    // Assertions
    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(mockId, mockInput, { new: true });
    expect(result).toEqual(mockUpdatedPost);
  });

  it('should return null if post not found', async () => {
    // Mock findByIdAndUpdate to return null
    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    // Execute resolver
    const result = await updatePost(null, { _id: 'non-existent-id', input: { title: 'Test' } }, null, null);

    // Assertions
    expect(result).toBeNull();
  });

  it('should throw error if database operation fails', async () => {
    const dbError = new Error('Database error');
    (Post.findByIdAndUpdate as jest.Mock).mockRejectedValue(dbError);

    await expect(updatePost(null, { _id: 'test-id', input: { title: 'Test' } }, null, null)).rejects.toThrow('Database error');
  });
});
