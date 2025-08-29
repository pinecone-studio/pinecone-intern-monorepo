import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';
import { unmatch } from 'src/resolvers/mutations';

jest.mock('src/models/match');
jest.mock('src/models/user');

const MockedMatchModel = MatchModel as jest.Mocked<typeof MatchModel>;
const MockedUsermodel = Usermodel as jest.Mocked<typeof Usermodel>;

describe('Unmatch Function', () => {
  const mockMatchId = '68b01828508f086ccdb5193e';
  const mockUserId1 = '68a7de7dfb1e387f1759ec2a';
  const mockUserId2 = '68a7e016604d7b8ba5ac573d';
  const mockContext = { userId: mockUserId1 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully unmatch users when match exists', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(mockMatchId),
      users: [new mongoose.Types.ObjectId(mockUserId1), new mongoose.Types.ObjectId(mockUserId2)],
      unmatched: false,
    };

    MockedMatchModel.findOne.mockResolvedValue(mockMatch);
    MockedMatchModel.findByIdAndUpdate.mockResolvedValue({
      ...mockMatch,
      unmatched: true,
    });
    MockedUsermodel.updateMany.mockResolvedValue({ modifiedCount: 2 });

    const result = await unmatch({}, { matchId: mockMatchId }, mockContext);

    expect(result).toEqual({
      success: true,
      message: 'Successfully unmatched users',
    });
    expect(MockedMatchModel.findOne).toHaveBeenCalledWith({
      _id: mockMatchId,
      unmatched: { $ne: true },
    });
    expect(MockedMatchModel.findByIdAndUpdate).toHaveBeenCalledWith(mockMatch._id, { unmatched: true }, { new: true });
    expect(MockedUsermodel.updateMany).toHaveBeenCalledWith({ _id: { $in: mockMatch.users } }, { $pull: { matchIds: mockMatch._id } });
  });

  // Test to cover the throw new Error('Unauthorized') line
  it('should throw Unauthorized error when userId is missing in context', async () => {
    await expect(unmatch({}, { matchId: mockMatchId }, { userId: undefined })).rejects.toThrowError(new Error('Unauthorized'));
  });

  // Additional test to cover console.error logging
  it('should log error to console when userId is missing', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(unmatch({}, { matchId: mockMatchId }, { userId: undefined })).rejects.toThrowError(new Error('Unauthorized'));

    expect(consoleErrorSpy).toHaveBeenCalledWith('Missing userId in context');
    consoleErrorSpy.mockRestore();
  });

  it('should throw MATCH_NOT_FOUND error when match does not exist', async () => {
    MockedMatchModel.findOne.mockResolvedValue(null);

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Match not found or already unmatched',
      extensions: {
        code: 'MATCH_NOT_FOUND',
        http: { status: 404 },
      },
    });
  });

  it('should throw UPDATE_FAILED error when match update fails', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(mockMatchId),
      users: [new mongoose.Types.ObjectId(mockUserId1), new mongoose.Types.ObjectId(mockUserId2)],
      unmatched: false,
    };

    MockedMatchModel.findOne.mockResolvedValue(mockMatch);
    MockedMatchModel.findByIdAndUpdate.mockResolvedValue(null);

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Failed to update match status',
      extensions: {
        code: 'UPDATE_FAILED',
        http: { status: 500 },
      },
    });
  });

  it('should handle unexpected errors and throw UNMATCH_FAILED error', async () => {
    MockedMatchModel.findOne.mockRejectedValue(new Error('Database error'));

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toMatchObject({
      message: 'Failed to unmatch users',
      extensions: {
        code: 'UNMATCH_FAILED',
        http: { status: 500 },
      },
    });
  });

  it('should log error when unmatch fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    MockedMatchModel.findOne.mockRejectedValue(new Error('Database error'));

    await expect(unmatch({}, { matchId: mockMatchId }, mockContext)).rejects.toThrow();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Unmatch failed:', 'Database error');
    consoleErrorSpy.mockRestore();
  });
});
