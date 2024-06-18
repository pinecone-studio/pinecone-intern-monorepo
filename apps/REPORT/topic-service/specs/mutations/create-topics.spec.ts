import { createTopic } from '@/graphql/resolvers/mutations';
import { TopicsModel } from '@/graphql/models/topic.models';

jest.mock('@/graphql/models/topic.models');

describe('createTopic resolver', () => {
  const mockTopic = {
    _id: '60d21b4667d0d8992e610c85',
    name: 'Test Topic',
    description: 'This is a test topic',
    comments: 'No comments',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new topic successfully', async () => {
    (TopicsModel.create as jest.Mock).mockResolvedValue(mockTopic);

    const input = {
      name: 'Test Topic',
      description: 'This is a test topic',
      comments: 'No comments',
    };

    const result = await createTopic({}, { input });

    expect(TopicsModel.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockTopic);
  });

  it('should throw an error when topic creation fails', async () => {
    (TopicsModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create topic'));

    const input = {
      name: 'Test Topic',
      description: 'This is a test topic',
      comments: 'No comments',
    };

    await expect(createTopic({}, { input })).rejects.toThrow('Failed to create topic');
    expect(TopicsModel.create).toHaveBeenCalledWith(input);
  });
});
