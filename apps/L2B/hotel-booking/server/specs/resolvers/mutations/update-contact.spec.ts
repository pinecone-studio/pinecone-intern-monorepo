import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import { updateContact } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');

describe('updateContact Mutation', () => {
  const mockUser = {
    _id: '12345',
    phone: 12345678,
    email: 'test@email.com',
    emergencyPhone: 87654321,
    relation: 'Parent',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update user information', async () => {
    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

    const result = await updateContact!(
      {},
      {
        _id: '12345',
        input: {
          phone: 87654321,
          email: 'test@gmail.com',
          emergencyPhone: 12345678,
          relation: 'Siblings',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '12345',
      {
        $set: {
          phone: 87654321,
          email: 'test@gmail.com',
          emergencyPhone: 12345678,
          relation: 'Siblings',
        },
      },
      { new: true }
    );
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user is not found', async () => {
    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(
      updateContact!(
        {},
        {
          _id: '12345',
          input: {
            phone: 87654321,
            email: 'test@gmail.com',
            emergencyPhone: 12345678,
            relation: 'Siblings',
          },
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('User not found');
  });
});
