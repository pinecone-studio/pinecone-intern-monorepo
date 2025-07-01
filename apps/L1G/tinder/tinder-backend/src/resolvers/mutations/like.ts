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

    return isMatch ? "🎉 It's a match!" : '👍 Like recorded successfully';
  } catch (error) {
    console.error('❌ Error in like mutation:', error);
    throw new Error('Failed to like user');
  }
};
