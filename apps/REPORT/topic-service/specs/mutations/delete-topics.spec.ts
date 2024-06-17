import { deleteTopic } from '@/graphql/resolvers/mutations';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/topic.models');

describe('deleteTopic resolver', () => {
  const mockTopic = {
    _id: '666bf56fc85e80e74cfceea9',
    name: 'Test Topic',
    description: 'This is a test topic',
    comments: 'No comments',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a topic successfully', async () => {
    (TopicsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTopic);

    const topicId = '666bf56fc85e80e74cfceea9';

    const result = await deleteTopic({}, { topicId });

    expect(TopicsModel.findByIdAndDelete).toHaveBeenCalledWith(topicId);
    expect(result).toEqual(mockTopic); // Ensure result matches the mockTopic object
  });

  it('should throw a GraphQLError when topic is not found', async () => {
    (TopicsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const topicId = '666bf56fc85e80e74cfceea9';

    await expect(deleteTopic({}, { topicId })).rejects.toThrow(GraphQLError);
    expect(TopicsModel.findByIdAndDelete).toHaveBeenCalledWith(topicId);
  });

  it('should throw an error when topic deletion fails', async () => {
    (TopicsModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Failed to delete topic'));

    const topicId = '666bf56fc85e80e74cfceea9';

    await expect(deleteTopic({}, { topicId })).rejects.toThrow('Failed to delete topic');
    expect(TopicsModel.findByIdAndDelete).toHaveBeenCalledWith(topicId);
  });
});
