import { Usermodel } from 'src/models/user';
import { getMe } from 'src/resolvers/queries';

jest.mock('src/models/user');

const mockedFindById = Usermodel.findById as jest.Mock;

describe('getMe resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws error if userId is not provided in context', async () => {
    const context = { userId: undefined };

    await expect(
      getMe(
        {
          //intentional empty
        },
        {
          //intentional empty
        },
        context as any
      )
    ).rejects.toThrow('Not authenticated');
    expect(mockedFindById).not.toHaveBeenCalled();
  });

  it('throws error if user is not found', async () => {
    const context = { userId: 'someUserId' };
    mockedFindById.mockResolvedValue(null);

    await expect(
      getMe(
        {
          //intentional empty
        },
        {
          //intentional empty
        },
        context as any
      )
    ).rejects.toThrow('User not found');
    expect(mockedFindById).toHaveBeenCalledWith('someUserId');
  });

  it('returns the user if found', async () => {
    const context = { userId: 'someUserId' };
    const fakeUser = { id: 'someUserId', name: 'John Doe' };
    mockedFindById.mockResolvedValue(fakeUser);

    const result = await getMe(
      {
        //intentional empty
      },
      {
        //intentional empty
      },
      context as any
    );

    expect(result).toEqual(fakeUser);
    expect(mockedFindById).toHaveBeenCalledWith('someUserId');
  });
});
