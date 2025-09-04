import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
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

const validateObjectId = (id: string): void => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new GraphQLError('Invalid user ID format', {
      extensions: { code: 'INVALID_ID', http: { status: 400 } },
    });
  }
};

const cleanupUserMatches = async (userId: mongoose.Types.ObjectId) => {
  const matches = await MatchModel.find({
    users: userId,
    unmatched: { $ne: true },
  });

  if (matches.length > 0) {
    await MatchModel.updateMany({ _id: { $in: matches.map((match) => match._id) } }, { unmatched: true });
  }

  return matches;
};

const cleanupUserLikes = async (userId: mongoose.Types.ObjectId) => {
  await Usermodel.updateMany({ likedBy: userId }, { $pull: { likedBy: userId } });

  await Usermodel.updateMany({ likedTo: userId }, { $pull: { likedTo: userId } });
};

const cleanupUserMatchIds = async (userId: mongoose.Types.ObjectId, matchIds: mongoose.Types.ObjectId[]) => {
  if (matchIds.length > 0) {
    await Usermodel.updateMany({ matchIds: { $in: matchIds } }, { $pull: { matchIds: { $in: matchIds } } });
  }
};

const performUserDeletion = async (userId: mongoose.Types.ObjectId) => {
  const deletedUser = await Usermodel.findByIdAndDelete(userId);

  if (!deletedUser) {
    throw new GraphQLError('Failed to delete user', {
      extensions: { code: 'DELETE_FAILED', http: { status: 500 } },
    });
  }

  return deletedUser;
};

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { id }, context) => {
  try {
    validateUserId(context.userId);
    validateObjectId(id);

    const userToDeleteId = new mongoose.Types.ObjectId(id);

    const matches = await cleanupUserMatches(userToDeleteId);

    await cleanupUserLikes(userToDeleteId);

    const matchIds = matches.map((match) => match._id);
    await cleanupUserMatchIds(userToDeleteId, matchIds);

    await performUserDeletion(userToDeleteId);

    return {
      success: true,
      message: 'User successfully deleted and all associated data cleaned up',
    };
  } catch (error) {
    console.error('Delete user failed:', (error as Error).message);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError('Failed to delete user', {
      extensions: { code: 'DELETE_USER_FAILED', http: { status: 500 } },
    });
  }
};
