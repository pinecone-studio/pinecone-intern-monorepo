import mongoose from 'mongoose';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { UnmatchArgs, IUnmatchResponse } from 'src/types';
import { GraphQLError } from 'graphql';
import { MutationResolvers } from 'src/generated';

const validateUserId = (userId: string | undefined): void => {
  if (!userId) {
    console.error('Missing userId in context');
    throw new GraphQLError('Unauthorized', {
      extensions: { code: 'UNAUTHORIZED', http: { status: 401 } },
    });
  }
};

const findMatch = async (matchId: string) => {
  const match = await MatchModel.findOne({
    _id: matchId,
    unmatched: { $ne: true },
  });

  if (!match) {
    throw new GraphQLError('Match not found or already unmatched', {
      extensions: { code: 'MATCH_NOT_FOUND', http: { status: 404 } },
    });
  }
  return match;
};

const updateMatchStatus = async (matchId: mongoose.Types.ObjectId) => {
  const updatedMatch = await MatchModel.findByIdAndUpdate(matchId, { unmatched: true }, { new: true });

  if (!updatedMatch) {
    throw new GraphQLError('Failed to update match status', {
      extensions: { code: 'UPDATE_FAILED', http: { status: 500 } },
    });
  }
  return updatedMatch;
};

const updateUserMatches = async (userIds: mongoose.Types.ObjectId[], matchId: mongoose.Types.ObjectId) => {
  await Usermodel.updateMany({ _id: { $in: userIds } }, { $pull: { matchIds: matchId } });
};

const clearLikes = async (userIds: mongoose.Types.ObjectId[]) => {
  if (userIds.length !== 2) {
    return;
  }

  const [userA, userB] = userIds;
  await Usermodel.findByIdAndUpdate(userA, {
    $pull: { likedTo: userB, likedBy: userB },
  });
  await Usermodel.findByIdAndUpdate(userB, {
    $pull: { likedTo: userA, likedBy: userA },
  });
};

export const unmatch: MutationResolvers['unmatch'] = async (_: unknown, { matchId }: UnmatchArgs, { userId }: { userId?: string }): Promise<IUnmatchResponse> => {
  try {
    validateUserId(userId);

    const match = await findMatch(matchId);

    await updateMatchStatus(match._id);

    await updateUserMatches(match.users, match._id);

    await clearLikes(match.users);

    return {
      success: true,
      message: 'Successfully unmatched users and cleared likes',
    };
  } catch (error) {
    console.error('Unmatch failed:', (error as Error).message);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError('Failed to unmatch users', {
      extensions: { code: 'UNMATCH_FAILED', http: { status: 500 } },
    });
  }
};
