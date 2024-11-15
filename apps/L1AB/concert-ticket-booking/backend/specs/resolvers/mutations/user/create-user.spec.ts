import { GraphQLResolveInfo } from 'graphql';
import { createUser } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest.fn().mockResolvedValue({
      _id: 'artist_id',
      name: 'John Doe',
      email: 'John Doe',
      password: 'John Doe',
      phone: 'John Doe',
    }),
  },
}));

describe('createArtist', () => {
  it('should create an artist', async () => {
    const userData = {
      input: {
        name: 'John Doe',
        email: 'John Doe',
        password: 'John Doe',
        phone: 'John Doe',
      },
    };

    // Call the createArtist resolver function
    const response = await createUser!({}, userData, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      _id: 'artist_id',
      name: 'John Doe',
      email: 'John Doe',
      password: 'John Doe',
      phone: 'John Doe',
    });
  });
});
