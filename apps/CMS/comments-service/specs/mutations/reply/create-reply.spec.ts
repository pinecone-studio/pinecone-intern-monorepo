import { publishReply } from '@/graphql/resolvers/mutations/reply/create-reply';
import { errorTypes, graphqlErrorHandler } from '../../../src/graphql/resolvers/error';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
import { filterWords } from '@/middlewares/filter-words';

jest.mock('@/models/reply.model', () => ({
  create: jest.fn(),
}));
jest.mock('@/middlewares/filter-words', () => ({
  filterWords: jest.fn(),
}));
describe('publishReply resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const createInput = {
    parentId: '',
    reply: 'This is a test reply.',
    commentId: '6628b347dfc5622cb34cedec',
    name: 'John Doe',
    email: 'johndoe@example.com',
    createdAt: new Date('2024-04-18T12:00:00Z'),
    ipAddress: '192.168.1.1',
  };
  it('should create reply and return its ID', async () => {
    (filterWords as jest.Mock).mockImplementation(() => {});
    const filteredReply = await filterWords(createInput.reply);
    const mockCreatedReply = {
      _id: 'test-reply-id',
      reply: filteredReply,
      parentId: createInput.parentId,
      commentId: createInput.commentId,
      name: createInput.name,
      email: createInput.email,
      createdAt: createInput.createdAt,
      idAddress: createInput.ipAddress,
    };

    (ReplyModel.create as jest.Mock).mockResolvedValueOnce(mockCreatedReply);

    const result = await publishReply!({}, { createInput }, {}, {} as GraphQLResolveInfo);

    expect(ReplyModel.create).toHaveBeenCalledWith({ reply: filteredReply, commentId: createInput.commentId, parentId: createInput.parentId, name: createInput.name, email: createInput.email });
    expect(result).toEqual(mockCreatedReply._id);
  });

  it('should throw an error if reply creation fails', async () => {
    const mockError = graphqlErrorHandler({ message: `cannot create reply` }, errorTypes.INTERVAL_SERVER_ERROR);

    (ReplyModel.create as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(publishReply!({}, { createInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(graphqlErrorHandler({ message: `cannot create reply` }, errorTypes.INTERVAL_SERVER_ERROR));
  });
});
