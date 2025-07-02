import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';
import { LikeArgs } from 'src/types';

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

      return "🎉 It's a match!";
    }

    return '👍 Like recorded successfully';
  } catch (error) {
    console.warn('⚠️ Like mutation failed:', (error as Error).message);
    throw new Error('Failed to like user');
  }
};
