import { GraphQLResolveInfo } from 'graphql';
import { updateComment } from '../../../../src/resolvers/mutations';


const input = { comment: "updated test",  postId: "1", userId: "1", };

jest.mock('../../../../src/models', () => ({
  commentsModel: {
    findByIdAndUpdate: jest.fn().mockReturnValueOnce({ _id: '1' }).mockReturnValueOnce(null),
  },
}));

describe('Update comment', () => {
  it('should update comment', async () => {
    const result = await updateComment!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo

    );
    expect(result).toEqual({
      _id: '1',
    });
  });

  it('Should return error when comment not found', async () => {
    try {
      await updateComment!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('comment not found'));
    }
  });
});
