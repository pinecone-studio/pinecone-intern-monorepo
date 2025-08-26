import { Usermodel } from 'src/models/user';
import { getUser } from 'src/resolvers/queries';

jest.mock('src/models/user');

describe('getUser resolver', () => {
  const mockPopulate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user when found', async () => {
    const fakeUser = { 
      _id: '123', 
      name: 'Alice', 
      interests: [], 
      likedBy: [], 
      likedTo: [], 
      matchIds: [] 
    };

    // Chain populate mocks
    mockPopulate.mockReturnThis();
    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    // Last populate call returns the user
    mockPopulate.mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce(fakeUser);

    const result = await getUser({}, { _id: '123' });

    expect(Usermodel.findById).toHaveBeenCalledWith('123');
    expect(mockPopulate).toHaveBeenCalledWith('interests');
    expect(mockPopulate).toHaveBeenCalledWith('likedBy');
    expect(mockPopulate).toHaveBeenCalledWith('likedTo');
    expect(mockPopulate).toHaveBeenCalledWith('matchIds');
    expect(result).toEqual(fakeUser);
  });

  it('should throw error when user not found', async () => {
    mockPopulate.mockReturnThis();
    (Usermodel.findById as jest.Mock).mockReturnValue({
      populate: mockPopulate,
    });

    mockPopulate.mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce({ populate: mockPopulate })
      .mockReturnValueOnce(null);

    await expect(getUser({}, { _id: 'notfound' }))
      .rejects.toThrow('User not found');
  });
});
