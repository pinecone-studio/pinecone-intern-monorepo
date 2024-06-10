import { GraphQLResolveInfo } from 'graphql';
import { addBadWord } from '@/graphql/resolvers/mutations';
import { BadWordModel } from '@/models/bad-word.model';

jest.mock('@/models/bad-word.model', () => ({
  BadWordModel: {
    create: jest.fn(),
  },
}));
describe('publishReply resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const word = 'fuck';

  it('should create reply and return its ID', async () => {
    const mockWord = {
      _id: 'test-word-id',
      word,
    };

    (BadWordModel.create as jest.Mock).mockResolvedValueOnce(mockWord);

    const result = await addBadWord!({}, { word }, {}, {} as GraphQLResolveInfo);

    expect(BadWordModel.create).toHaveBeenCalledWith({ word });
    expect(result).toEqual(mockWord._id);
  });

  it('should throw an error if reply creation fails', async () => {
    const mockError = new Error('Failed to add bad word');
    (BadWordModel.create as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(addBadWord!({}, { word }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(mockError);
  });
});
