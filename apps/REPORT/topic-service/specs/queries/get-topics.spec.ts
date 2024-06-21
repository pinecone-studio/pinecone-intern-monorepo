import { getTopics } from '@/graphql/resolvers/queries';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/topic.models', () => ({
  TopicsModel: {
    find: jest.fn(),
  },
}));

describe('getTopics resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return topics when found', async () => {
    const mockTopics = [
      { _id: '1', name: 'Topic 1' },
      { _id: '2', name: 'Topic 2' },
    ];
    (TopicsModel.find as jest.Mock).mockResolvedValue(mockTopics);

    const result = await getTopics();

    expect(result).toEqual(mockTopics);
    expect(TopicsModel.find).toHaveBeenCalledTimes(1);
  });

  it('should throw GraphQLError when no topics are found', async () => {
    (TopicsModel.find as jest.Mock).mockResolvedValue(null); // Mock with null instead of []

    await expect(getTopics()).rejects.toThrow(GraphQLError);
    expect(TopicsModel.find).toHaveBeenCalledTimes(1);
  });

  it('should throw GraphQLError when TopicsModel.find throws an error', async () => {
    (TopicsModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getTopics()).rejects.toThrow(GraphQLError);
    expect(TopicsModel.find).toHaveBeenCalledTimes(1);
  });
});
