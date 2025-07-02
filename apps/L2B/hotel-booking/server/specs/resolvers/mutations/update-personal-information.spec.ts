import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import { updatePersonalInformation } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');

describe('updatePersonalInformation Mutation', () => {
  const mockUser = {
    _id: '12345',
    firstName: 'John',
    lastName: 'Doe',
    birth: '1990-01-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update user information', async () => {
    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

    const result = await updatePersonalInformation!(
      {},
      {
        _id: '12345',
        firstName: 'Jane',
        lastName: 'Doe',
        birth: '1992-02-02',
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
      '12345',
      {
        $set: {
          firstName: 'Jane',
          lastName: 'Doe',
          birth: '1992-02-02',
        },
      },
      { new: true }
    );
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user is not found', async () => {
    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(
      updatePersonalInformation!(
        {},
        {
          _id: '12345',
          firstName: 'Jane',
          lastName: 'Doe',
          birth: '1992-02-02',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('User not found');
  });
});
