import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';
import { publishComment } from '../../src/graphql/resolvers/mutations/create-comment'; // Adjust the import path as per your project structure

jest.mock('@/models/comment.model', () => ({
  CommentsModel: {
    create: jest.fn().mockImplementation(async (data) => {
      if (data.name === 'Ace') {
        return { _id: '123456789', ...data };
      } else {
        throw new Error('Error creating comment');
      }
    }),
  },
}));

describe('publishComment resolver', () => {
  it('should create a comment and return its ID', async () => {
    const createInput = {
      name: 'Ace',
      comment: 'test',
      email: 'ace@gmail.com',
      entityId: 'asdf',
      entityType: 'ad',
      articleId: '661c87fd6837efa536464d24',
    };
    const result = await publishComment!({}, { createInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('123456789');
  });

  it('should throw an error if comment creation fails', async () => {
    const createInput = {
      name: 'InvalidName',
      comment: 'test',
      email: 'ace@gmail.com',
      entityId: 'asdf',
      entityType: 'ad',
      articleId: '661c87fd6837efa536464d24',
    };
    await expect(publishComment!({}, { createInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(graphqlErrorHandler({ message: 'cannot create comment' }, errorTypes.INTERVAL_SERVER_ERROR));
  });
});
