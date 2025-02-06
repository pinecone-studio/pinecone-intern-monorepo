import { createUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/user';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
      userName: 'jordan',
      fullName: 'jordan mike',
      email: 'jordan@gmail.com',
      bio: '',
      password: 'jordan1234',
      isPrivate: false,
      hasStory: false,
      profileImage: 'http://image',
      gender: 'not_know',
    }),
    findOne: jest.fn().mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValueOnce({
      userName: 'jordan',
      fullName: 'jordan mike',
      email: 'jordan@gmail.com',
      bio: '',
      password: 'jordan1234',
      isPrivate: false,
      hasStory: false,
      profileImage: 'http://image',
      gender: 'not_know',
    }).mockReturnValueOnce(null).mockReturnValueOnce({
      userName: 'jordan',
      fullName: 'jordan mike',
      email: 'jordan@gmail.com',
      bio: '',
      password: 'jordan1234',
      isPrivate: false,
      hasStory: false,
      profileImage: 'http://image',
      gender: 'not_know',
    }),
  },
}));

describe('Create user', () => {
  it('should create a user', async () => {
    if (!createUser) {
      return;
    }
    const input = {
      fullName: 'jordan mike',
      password: '1234',
      userName: 'jordan',
      email: 'jordan@gmail.com',
    };

    const result = await createUser({}, { input }, { userId: null }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userName: 'jordan',
      fullName: 'jordan mike',
      email: 'jordan@gmail.com',
      bio: '',
      password: 'jordan1234',
      isPrivate: false,
      hasStory: false,
      profileImage: 'http://image',
      gender: 'not_know',
    });
  });
  it('should throw an error when email is duplicate', async () => {
    if (!createUser) {
      return;
    }
    const input = {
      fullName: 'jordan mike',
      password: '1234',
      userName: 'jordan',
      email: 'jordan@gmail.com',
    };
    await expect(createUser({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Имэйл хэрэглэгдсэн байна !');
  });
  it('Should throw an username duplicate error',async()=>{
    if (!createUser) {
      return;
    }
    const input = {
      fullName: 'jordan mike',
      password: '1234',
      userName: 'jordan',
      email: 'jordan@gmail.com',
    };
    await expect(createUser({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Нэр хэрэглэгдсэн байна !');
  })
});
