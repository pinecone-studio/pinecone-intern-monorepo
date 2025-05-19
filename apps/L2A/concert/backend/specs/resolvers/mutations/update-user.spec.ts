import { userModel } from '../../../src/models';
import { updateUserInfo } from '../../../src/resolvers/mutations';
import { catchError } from '../../../src/utils/catch-error';

jest.mock('../../../src/models');
jest.mock('../../../src/utils/catch-error');

describe('updateUserInfo', () => {
  const mockUserId = 'user-id-123';
  const mockUpdatedUser = {
    _id: mockUserId,
    email: 'new@example.com',
    phone: '99112233',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user email and phone successfully', async () => {
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const result = await updateUserInfo(
      {},
      {
        id: mockUserId,
        email: 'new@example.com',
        phone: '99112233',
      }
    );

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, { email: 'new@example.com', phone: '99112233' }, { new: true });
    expect(result).toEqual(mockUpdatedUser);
  });

  it('should call catchError if an error occurs', async () => {
    const mockError = new Error('DB error');
    (userModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(mockError);

    await updateUserInfo(
      {},
      {
        id: mockUserId,
        email: 'error@example.com',
        phone: '99001122',
      }
    );

    expect(catchError).toHaveBeenCalledWith(mockError);
  });
});
