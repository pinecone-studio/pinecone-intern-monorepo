import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import mongoose from 'mongoose';
import { LikeArgs } from 'src/types';
import { GraphQLError } from 'graphql';

interface LikeResponse {
  isMatch: boolean;
  message: string;
  matchId?: string;
}

export const like = async (_: unknown, args: LikeArgs): Promise<LikeResponse> => {
  const { likedByUser, likeReceiver } = args;

  try {
    const likedByUserId = new mongoose.Types.ObjectId(likedByUser);
    const likeReceiverId = new mongoose.Types.ObjectId(likeReceiver);

    await Usermodel.findByIdAndUpdate(likeReceiverId, { $addToSet: { likedBy: likedByUserId } });
    await Usermodel.findByIdAndUpdate(likedByUserId, { $addToSet: { likedTo: likeReceiverId } });

    const receiverUser = await Usermodel.findById(likeReceiverId).select('likedTo');
    const likedToArray = receiverUser?.likedTo as mongoose.Types.ObjectId[] | undefined;
    const isMatch = likedToArray?.some((id) => id.equals(likedByUserId)) ?? false;

    if (isMatch) {
      const match = await MatchModel.create({
        users: [likedByUserId, likeReceiverId],
      });

      await Usermodel.findByIdAndUpdate(likedByUserId, { $addToSet: { matchIds: match._id } });
      await Usermodel.findByIdAndUpdate(likeReceiverId, { $addToSet: { matchIds: match._id } });

      return {
        isMatch: true,
        message: "It's a match! You can now chat!",
        matchId: match._id.toString(),
      };
    }

    return {
      isMatch: false,
      message: 'Like successful, waiting for a match.',
      matchId: '',
    };
  } catch (error) {
    console.error('Like failed:', (error as Error).message);
    throw new GraphQLError('Failed to like user', {
      extensions: {
        code: 'LIKE_FAILED',
        http: { status: 500 },
      },
    });
  }
};
