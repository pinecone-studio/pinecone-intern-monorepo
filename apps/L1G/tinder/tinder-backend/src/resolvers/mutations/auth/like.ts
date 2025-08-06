import { Usermodel } from 'src/models/user.model';
import mongoose from 'mongoose';
import { LikeArgs } from 'src/types';
import { GraphQLError } from 'graphql';

export const like = async (_: unknown, args: LikeArgs): Promise<string> => {
  const { likedByUser, likeReceiver } = args;

  try {
    const likedByUserId = new mongoose.Types.ObjectId(likedByUser);
    const likeReceiverId = new mongoose.Types.ObjectId(likeReceiver);

    await Usermodel.findByIdAndUpdate(likeReceiverId, { $addToSet: { likedBy: likedByUserId } }, { new: true });

    await Usermodel.findByIdAndUpdate(likedByUserId, { $addToSet: { likedTo: likeReceiverId } }, { new: true });

    const receiverUser = await Usermodel.findById(likeReceiverId).select('likedTo');

    const likedToArray = receiverUser?.likedTo as mongoose.Types.ObjectId[] | undefined;

    const isMatch = likedToArray?.some((id) => id.equals(likedByUserId)) ?? false;

    if (isMatch) {
      await Usermodel.findByIdAndUpdate(likeReceiverId, { $addToSet: { matched: likedByUserId } }, { new: true });

      await Usermodel.findByIdAndUpdate(likedByUserId, { $addToSet: { matched: likeReceiverId } }, { new: true });

      return "It's a match! You can now chat!";
    }

    return 'Like successful, waiting for a match.';
  } catch (error) {
    throw new GraphQLError('Failed to like user', {
      extensions: {
        code: 'LIKE_FAILED',
        http: { status: 500 },
      },
    });
  }
};
