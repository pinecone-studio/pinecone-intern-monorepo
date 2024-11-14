import { createUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const mock = {
  _id: 1,
  email: 'test@gmail.com',
  username: 'Test',
  fullname: 'Test',
  password: 'Test',
  profilePicture: 'Test',
  bio: 'Test',
  isPrivate: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest.fn().mockResolvedValue({
      toObject: () => mock,
    }),
  },
}));

describe('Create user', () => {
  it('Should create user', async () => {
    await createUser!(
      {},
      {
        input: {
          fullname: mock.fullname,
          username: mock.fullname,
          email: mock.email,
          password: mock.password,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
  });
});
