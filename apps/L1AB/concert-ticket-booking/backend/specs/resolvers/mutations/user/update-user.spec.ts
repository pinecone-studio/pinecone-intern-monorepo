import { updateUser } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'Name',
        password: '123',
        email: 'tur5455@gmail.com',
        phone: '1234567890',
      })
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: '123', name: 'Test User' })
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Update User Mutation', () => {
  it('Should update user successfully', async () => {
    const result = await updateUser(
      {},
      {
        input: {
          name: 'Name',
          password: '123',
          email: 'tur5455@gmail.com',
          phone: '1234567890',
        },
      },
      { user: { userId: '1' } }
    );

    expect(result).toEqual({
      name: 'Name',
      password: '123',
      email: 'tur5455@gmail.com',
      phone: '1234567890',
    });
  });

  it('Should throw an error if the user is not found', async () => {
    try {
      await updateUser(
        {},
        {
          input: {
            name: 'Test Name',
            password: 'testPassword',
            email: 'testemail@example.com',
            phone: '1234567890',
          },
        },
        { user: { userId: 'nonexistent-id' } }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update user');
      } else {
        fail('Failed to update user');
      }
    }
  });

  it('Should throw an error if there is a database error', async () => {
    try {
      await updateUser!(
        {},
        {
          input: {
            name: undefined,
            password: undefined,
            email: undefined,
            phone: undefined,
          },
        },
        { user: { userId: '' } }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual('Failed to update user');
      } else {
        fail('Failed to update user');
      }
    }
  });
});
