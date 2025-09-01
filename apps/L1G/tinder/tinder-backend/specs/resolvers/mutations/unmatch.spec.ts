import mongoose from 'mongoose';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { unmatch } from 'src/resolvers/mutations';
import { GraphQLError } from 'graphql';

jest.mock('src/models/match');
jest.mock('src/models/user');

const MockedMatchModel = MatchModel as jest.Mocked<typeof MatchModel>;
const MockedUsermodel = Usermodel as jest.Mocked<typeof Usermodel>;

describe('unmatch mutation resolver', () => {
  const mockMatchId = '68b01828508f086ccdb5193e';
  const mockUserId1 = '68a7de7dfb1e387f1759ec2a';
  const mockUserId2 = '68a7e016604d7b8ba5ac573d';
  const mockContext = { userId: mockUserId1 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully unmatches users and clears likes', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(mockMatchId),
      users: [new mongoose.Types.ObjectId(mockUserId1), new mongoose.Types.ObjectId(mockUserId2)],
      unmatched: false,
    };

    MockedMatchModel.findOne.mockResolvedValue(mockMatch);
    MockedMatchModel.findByIdAndUpdate.mockResolvedValue({ ...mockMatch, unmatched: true });
    MockedUsermodel.updateMany.mockResolvedValue({ modifiedCount: 2 });
    MockedUsermodel.findByIdAndUpdate.mockResolvedValue(null); // for clearing likes

    const result = await unmatch({}, { matchId: mockMatchId }, mockContext);

    expect(result).toEqual({
      success: true,
      message: 'Successfully unmatched users and cleared likes',
    });

    expect(MockedMatchModel.findOne).toHaveBeenCalledWith({
      _id: mockMatchId,
      unmatched: { $ne: true },
    });

    expect(MockedMatchModel.findByIdAndUpdate).toHaveBeenCalledWith(mockMatch._id, { unmatched: true }, { new: true });

    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ _id: { $in: mockMatch.users } }, { $pull: { matchIds: mockMatch._id } });

    // Verify clearing likes calls
    expect(MockedUsermodel.findByIdAndUpdate).toHaveBeenCalledTimes(2);
    expect(MockedUsermodel.findByIdAndUpdate).toHaveBeenCalledWith(mockMatch.users[0], { $pull: { likedTo: mockMatch.users[1], likedBy: mockMatch.users[1] } });
    expect(MockedUsermodel.findByIdAndUpdate).toHaveBeenCalledWith(mockMatch.users[1], { $pull: { likedTo: mockMatch.users[0], likedBy: mockMatch.users[0] } });
  });

  it('throws Unauthorized error when userId missing', async () => {
    await expect(unmatch({}, { matchId: mockMatchId }, { userId: undefined })).rejects.toThrow(GraphQLError);
    await expect(unmatch({}, { matchId: mockMatchId }, { userId: undefined })).rejects.toMatchObject({
      message: 'Unauthorized',
      extensions: { code: 'UNAUTHORIZED', http: { status: 401 } },
    });
  });

  it('logs error when userId missing', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intenionally empty
    });
    await expect(unmatch({}, { matchId: mockMatchId }, { userId: undefined })).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Missing userId in context');
    consoleErrorSpy.mockRestore();
  });

  it('throws MATCH_NOT_FOUND if match not found', async () => {
    MockedMatchModel.findOne.mockResolvedValue(null);

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Match not found or already unmatched',
      extensions: { code: 'MATCH_NOT_FOUND', http: { status: 404 } },
    });
  });

  it('throws UPDATE_FAILED if match update fails', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(mockMatchId),
      users: [new mongoose.Types.ObjectId(mockUserId1), new mongoose.Types.ObjectId(mockUserId2)],
      unmatched: false,
    };

    MockedMatchModel.findOne.mockResolvedValue(mockMatch);
    MockedMatchModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Failed to update match status',
      extensions: { code: 'UPDATE_FAILED', http: { status: 500 } },
    });
  });
  it('should skip clearing likes if users array length is not 2', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(mockMatchId),
      users: [new mongoose.Types.ObjectId(mockUserId1)],
      unmatched: false,
    };

    MockedMatchModel.findOne.mockResolvedValue(mockMatch);
    MockedMatchModel.findByIdAndUpdate.mockResolvedValue({ ...mockMatch, unmatched: true });
    MockedUsermodel.updateMany.mockResolvedValue({ modifiedCount: 1 });
    MockedUsermodel.findByIdAndUpdate.mockResolvedValue(null);

    const result = await unmatch({}, { matchId: mockMatchId }, mockContext);

    expect(result).toEqual({
      success: true,
      message: 'Successfully unmatched users and cleared likes',
    });

    expect(MockedUsermodel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('handles unexpected errors and throws UNMATCH_FAILED', async () => {
    MockedMatchModel.findOne.mockRejectedValue(new Error('Database error'));

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Failed to unmatch users',
      extensions: { code: 'UNMATCH_FAILED', http: { status: 500 } },
    });
  });

  it('logs error when unmatch fails unexpectedly', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
    MockedMatchModel.findOne.mockRejectedValue(new Error('Database error'));

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unmatch failed:', 'Database error');
    consoleErrorSpy.mockRestore();
  });
});
