/*eslint-disable max-lines*/
import mongoose from 'mongoose';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { deleteUser } from 'src/resolvers/mutations/auth/delete-user';
import { GraphQLError } from 'graphql';

jest.mock('src/models/match');
jest.mock('src/models/user');

const MockedMatchModel = MatchModel as jest.Mocked<typeof MatchModel>;
const MockedUsermodel = Usermodel as jest.Mocked<typeof Usermodel>;

describe('deleteUser mutation resolver', () => {
  const mockUserId = '68a7de7dfb1e387f1759ec2a';
  const mockUserToDeleteId = '68a7e016604d7b8ba5ac573d';
  const mockContext = { userId: mockUserId };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully deletes user and cleans up all associated data', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(mockUserToDeleteId),
      email: 'test@example.com',
      name: 'Test User',
    };

    const mockMatches = [
      {
        _id: new mongoose.Types.ObjectId('68b01828508f086ccdb5193e'),
        users: [new mongoose.Types.ObjectId(mockUserToDeleteId), new mongoose.Types.ObjectId(mockUserId)],
        unmatched: false,
      },
    ];

    MockedMatchModel.find.mockResolvedValue(mockMatches);
    MockedMatchModel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 1, matchedCount: 1, upsertedCount: 0, upsertedId: null });
    MockedUsermodel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 2, matchedCount: 2, upsertedCount: 0, upsertedId: null }); // for cleaning likes
    MockedUsermodel.findByIdAndDelete.mockResolvedValue(mockUser);

    const result = await (deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext, {} as any);

    expect(result).toEqual({
      success: true,
      message: 'User successfully deleted and all associated data cleaned up',
    });

    // Verify match cleanup
    expect(MockedMatchModel.find).toHaveBeenCalledWith({
      users: new mongoose.Types.ObjectId(mockUserToDeleteId),
      unmatched: { $ne: true },
    });

    // Verify match status update
    expect(MockedMatchModel.updateMany).toHaveBeenCalledWith({ _id: { $in: mockMatches.map((match) => match._id) } }, { unmatched: true });

    // Verify likes cleanup
    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ likedBy: new mongoose.Types.ObjectId(mockUserToDeleteId) }, { $pull: { likedBy: new mongoose.Types.ObjectId(mockUserToDeleteId) } });
    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ likedTo: new mongoose.Types.ObjectId(mockUserToDeleteId) }, { $pull: { likedTo: new mongoose.Types.ObjectId(mockUserToDeleteId) } });

    // Verify match IDs cleanup
    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ matchIds: { $in: mockMatches.map((match) => match._id) } }, { $pull: { matchIds: { $in: mockMatches.map((match) => match._id) } } });

    // Verify user deletion
    expect(MockedUsermodel.findByIdAndDelete).toHaveBeenCalledWith(new mongoose.Types.ObjectId(mockUserToDeleteId));
  });

  it('throws Unauthorized error when userId missing', async () => {
    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, { userId: undefined }, {} as any)).rejects.toThrow(GraphQLError);
    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, { userId: undefined }, {} as any)).rejects.toMatchObject({
      message: 'Unauthorized',
      extensions: { code: 'UNAUTHORIZED', http: { status: 401 } },
    });
  });

  it('logs error when userId missing', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // intentionally empty
    });
    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, { userId: undefined }, {} as any)).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Missing userId in context');
    consoleErrorSpy.mockRestore();
  });

  it('throws INVALID_ID error for invalid ObjectId format', async () => {
    await expect((deleteUser as any)({}, { id: 'invalid-id' }, mockContext, {} as any)).rejects.toMatchObject({
      message: 'Invalid user ID format',
      extensions: { code: 'INVALID_ID', http: { status: 400 } },
    });
  });

  it('handles case when user has no matches', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(mockUserToDeleteId),
      email: 'test@example.com',
      name: 'Test User',
    };

    MockedMatchModel.find.mockResolvedValue([]); // No matches
    MockedUsermodel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 0, matchedCount: 0, upsertedCount: 0, upsertedId: null }); // for cleaning likes
    MockedUsermodel.findByIdAndDelete.mockResolvedValue(mockUser);

    const result = await (deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext, {} as any);

    expect(result).toEqual({
      success: true,
      message: 'User successfully deleted and all associated data cleaned up',
    });

    // Should not call match update when no matches
    expect(MockedMatchModel.updateMany).not.toHaveBeenCalledWith(expect.any(Object), { unmatched: true });
  });

  it('throws DELETE_FAILED error when user deletion fails', async () => {
    MockedMatchModel.find.mockResolvedValue([]);
    MockedUsermodel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 0, matchedCount: 0, upsertedCount: 0, upsertedId: null });
    MockedUsermodel.findByIdAndDelete.mockResolvedValue(null); // Deletion fails

    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext, {} as any)).rejects.toMatchObject({
      message: 'Failed to delete user',
      extensions: { code: 'DELETE_FAILED', http: { status: 500 } },
    });
  });

  it('handles unexpected errors and throws DELETE_USER_FAILED', async () => {
    MockedMatchModel.find.mockRejectedValue(new Error('Database error'));

    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext, {} as any)).rejects.toMatchObject({
      message: 'Failed to delete user',
      extensions: { code: 'DELETE_USER_FAILED', http: { status: 500 } },
    });
  });

  it('logs error when delete user fails unexpectedly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // intentionally empty
    });
    MockedMatchModel.find.mockRejectedValue(new Error('Database error'));

    await expect((deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext)).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Delete user failed:', 'Database error');
    consoleErrorSpy.mockRestore();
  });

  it('successfully handles user with multiple matches', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(mockUserToDeleteId),
      email: 'test@example.com',
      name: 'Test User',
    };

    const mockMatches = [
      {
        _id: new mongoose.Types.ObjectId('68b01828508f086ccdb5193e'),
        users: [new mongoose.Types.ObjectId(mockUserToDeleteId), new mongoose.Types.ObjectId(mockUserId)],
        unmatched: false,
      },
      {
        _id: new mongoose.Types.ObjectId('68b01828508f086ccdb5193f'),
        users: [new mongoose.Types.ObjectId(mockUserToDeleteId), new mongoose.Types.ObjectId('68a7e016604d7b8ba5ac573e')],
        unmatched: false,
      },
    ];

    MockedMatchModel.find.mockResolvedValue(mockMatches);
    MockedMatchModel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 2, matchedCount: 2, upsertedCount: 0, upsertedId: null });
    MockedUsermodel.updateMany.mockResolvedValue({ acknowledged: true, modifiedCount: 3, matchedCount: 3, upsertedCount: 0, upsertedId: null }); // for cleaning likes
    MockedUsermodel.findByIdAndDelete.mockResolvedValue(mockUser);

    const result = await (deleteUser as any)({}, { id: mockUserToDeleteId }, mockContext, {} as any);

    expect(result).toEqual({
      success: true,
      message: 'User successfully deleted and all associated data cleaned up',
    });

    // Verify all matches are marked as unmatched
    expect(MockedMatchModel.updateMany).toHaveBeenCalledWith({ _id: { $in: mockMatches.map((match) => match._id) } }, { unmatched: true });

    // Verify match IDs cleanup includes all match IDs
    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ matchIds: { $in: mockMatches.map((match) => match._id) } }, { $pull: { matchIds: { $in: mockMatches.map((match) => match._id) } } });
  });
});
