import { deleteComment } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  commentsModel: {
    findByIdAndDelete: jest.fn().mockReturnValueOnce('Success').mockReturnValue(null),
  },
}));

describe('Delete comment', () => {
  it('Should delete comment', async () => {
    const result = await deleteComment!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toBe('Success');
  });

  it('Should not delete comment', async () => {
    try {
      await deleteComment!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Comment not found'));
    }
  });
});
