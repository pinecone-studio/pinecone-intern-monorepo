import { GraphQLResolveInfo } from 'graphql';
import { createUser } from '../../../src/resolvers/mutations';

const mockUser = {
  _id: '1',
  email: 'test@gmail.com',
  password: 'hashedPassword',
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../../../src/models/user.model.ts', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      toObject: () => mockUser,
    }),
  },
}));

describe('Create user', () => {
  it('Should create a new user successfully', async () => {
    await createUser!(
      {},
      {
        input: {
          email: mockUser.email,
          password: 'plainPassword',
          age: '',
          bio: '',
          hobby: '',
          interest: '',
          job: '',
          profession: '',
          username: '',
        },
      },
      {
        req: undefined,
      },
      {} as GraphQLResolveInfo
    );
  });
});
