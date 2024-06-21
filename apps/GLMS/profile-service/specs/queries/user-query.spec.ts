import { getGlmsUsers } from '@/graphql/resolvers/queries';
import glmsUserModel from '@/graphql/models/user.model';

jest.mock('../../src/graphql/models/user.model', () => ({
  find: jest.fn(),
}));

describe('Glms User Query', () => {
  it('Should call glms user query', async () => {
    const mockQuery = [
      {
        id: '1',
        firstName: 'Kke',
        lastName: 'LAstaa',
        email: 'mockTest@gmail.com',
        password: 'Jestpass',
        roles: 'STUDENT',
        avatar: 'iuhsdg',
      },
    ];

    (glmsUserModel.find as jest.Mock).mockResolvedValue(mockQuery);
    const result = await getGlmsUsers();
    expect(result).toEqual(mockQuery);
  });

  it('Should handle error when glmsUserModel.find fails', async () => {
    (glmsUserModel.find as jest.Mock).mockRejectedValue(new Error('data base error'));

    await expect(getGlmsUsers()).rejects.toThrow('Unsuccessful query');
  });
});
