import { updateTopic } from '@/graphql/resolvers/mutations';
import { TopicsModel } from '@/graphql/models/topic.models';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/topic.models');

describe('updateTopic resolver', () => {
  const mockTopic = {
    _id: '666bf3f411a2c1ac2e6d0675',
    name: 'Updated Topic',
    description: 'This is an updated topic',
    comments: 'Updated comments',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a topic successfully', async () => {
    (TopicsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTopic);

    const input = {
      _id: '666bf3f411a2c1ac2e6d0675',
      name: 'Updated Topic',
      description: 'This is an updated topic',
      comments: 'Updated comments',
    };

    const result = await updateTopic({}, { input });

    expect(TopicsModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        description: input.description,
        comments: input.comments,
      },
      { new: true }
    );
    expect(result).toEqual(mockTopic);
  });

  it('should throw a GraphQLError when topic is not found', async () => {
    (TopicsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const input = {
      _id: '666bf3f411a2c1ac2e6d0675',
      name: 'Updated Topic',
      description: 'This is an updated topic',
      comments: 'Updated comments',
    };

    await expect(updateTopic({}, { input })).rejects.toThrow(GraphQLError);
    expect(TopicsModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        description: input.description,
        comments: input.comments,
      },
      { new: true }
    );
  });

  it('should throw an error when topic update fails', async () => {
    (TopicsModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Failed to update topic'));

    const input = {
      _id: '666bf3f411a2c1ac2e6d0675',
      name: 'Updated Topic',
      description: 'This is an updated topic',
      comments: 'Updated comments',
    };

    await expect(updateTopic({}, { input })).rejects.toThrow('Failed to update topic');
    expect(TopicsModel.findByIdAndUpdate).toHaveBeenCalledWith(
      input._id,
      {
        name: input.name,
        description: input.description,
        comments: input.comments,
      },
      { new: true }
    );
  });
});
