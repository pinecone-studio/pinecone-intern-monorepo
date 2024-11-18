import { updateUser } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: "Name",
        password: "123",
        email: "tur5455@gmail.com",
        phone: "1234567890",
      })
      .mockResolvedValueOnce(null) 
      .mockRejectedValueOnce(new Error('Database error')),
  },
}));

describe('Update User Mutation', () => {
  it('Should update user successfully', async () => {
    const result = await updateUser(
      {},
      {
        input: {
          userId: "1",
          name: "Name",
          password: "123",
          email: "tur5455@gmail.com",
          phone: "1234567890",
        },
      }
    );

    expect(result).toEqual({
      _id: "1",
      name: "Name",
      password: "123",
      email: "tur5455@gmail.com",
      phone: "1234567890",
    });
  });

  
  it('Should throw an error if there is a database error', async () => {
    try {
      await updateUser(
        {},
        {
          input: {
            userId: "1",
            name: "Name",
            password: "123",
            email: "tur5455@gmail.com",
            phone: "1234567890",
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toEqual("Failed to update user");
      } else {
        fail('Expected error to be an instance of Error');
      }
    }
  });
});
