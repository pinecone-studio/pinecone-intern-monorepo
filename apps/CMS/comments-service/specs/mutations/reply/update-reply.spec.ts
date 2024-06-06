import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { updateReply } from '@/graphql/resolvers/mutations';
import { accessTokenAuth } from '@/middlewares/auth-token';
import { filterWords } from '@/middlewares/filter-words';
import ReplyModel from '@/models/reply.model';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('@/models/reply.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));
jest.mock('@/middlewares/auth-token', () => ({
  accessTokenAuth: jest.fn(),
}));
jest.mock('@/middlewares/filter-words', () => ({
  filterWords: jest.fn(),
}));
describe('update reply mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  (accessTokenAuth as jest.Mock).mockImplementation(() => {});
  (filterWords as jest.Mock).mockImplementation(() => {});
  it('should update reply and return id', async () => {
    const updateInput = { _id: '662fa120fc8ed6fdd88ace2d', reply: 'test', name: 'test', email: 'test' };
    (ReplyModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updateInput);
    const filteredReply = await filterWords(updateInput.reply);
    const result = await updateReply!({}, { updateInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(updateInput._id);
    expect(ReplyModel.findByIdAndUpdate).toHaveBeenCalledWith(updateInput._id, { reply: filteredReply, name: updateInput.name, email: updateInput.email });
  });
  it('should return error when failed to update', async () => {
    const updateInput = {
      _id: '',
      name: '',
      email: '',
      reply: '',
    };
    const errorMessage = graphqlErrorHandler({ message: `cannot update reply` }, errorTypes.INTERVAL_SERVER_ERROR);
    jest.spyOn(ReplyModel, 'findByIdAndUpdate').mockRejectedValueOnce(errorMessage);
    try {
      await updateReply!({}, { updateInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(errorMessage);
    }
  });
});
