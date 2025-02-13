import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { savedSearchUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

// Mock хийх
jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    updateOne: jest.fn(),
  },
}));

describe('savedSearchUser Mutation', () => {
  const mockuserid = '123';
  const searchedUserId = 'searchedUser456';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Хэрэв хэрэглэгч өмнө нь хадгалсан бол шинэчлэхгүй', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({ _id: mockuserid });

    if (!savedSearchUser) return;

    const result = await savedSearchUser({}, { searchedUserId }, { userId: '123' }, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      _id: mockuserid,
      savedUsers: { $in: [searchedUserId] },
    });
    expect(UserModel.findOneAndUpdate).not.toHaveBeenCalled();
    expect(result).toEqual({ _id: mockuserid });
  });

  test('Шинэ хэрэглэгчийг хадгалж, 10-аас их байвал хамгийн сүүлчийн ID-г устгах', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
      _id: mockuserid,
      savedUsers: Array(11).fill('someUser').concat([searchedUserId]), // 11 элементтэй болгох
    });

    if (!savedSearchUser) return;

    await savedSearchUser({}, { searchedUserId }, { userId: '123' }, {} as GraphQLResolveInfo);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockuserid },
      {
        $push: { savedUsers: { $each: [searchedUserId], $position: 0 } },
        $setOnInsert: { savedUsers: [] },
      },
      { new: true, upsert: true }
    );

    expect(UserModel.updateOne).toHaveBeenCalledWith({ _id: mockuserid }, { $pop: { savedUsers: 1 } });
  });

  test('Хэрэв `savedUsers` байхгүй бол автоматаар массив үүсгэх', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue({
      _id: mockuserid,
      savedUsers: [searchedUserId],
    });

    if (!savedSearchUser) return;

    const result = await savedSearchUser({}, { searchedUserId }, { userId: '123' }, {} as GraphQLResolveInfo);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: mockuserid },
      {
        $push: { savedUsers: { $each: [searchedUserId], $position: 0 } },
        $setOnInsert: { savedUsers: [] },
      },
      { new: true, upsert: true }
    );

    expect(result).toEqual({
      _id: mockuserid,
      savedUsers: [searchedUserId],
    });
  });
});
