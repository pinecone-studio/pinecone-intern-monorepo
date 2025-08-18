import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import mongoose from 'mongoose';
import { disLikeArgs } from 'src/types';

export const dislike = async (_: unknown, args: disLikeArgs): Promise<string> => {
  const { dislikedByUser, dislikeReceiver } = args;

  try {
    const dislikedByUserId = new mongoose.Types.ObjectId(dislikedByUser);
    const dislikeReceiverId = new mongoose.Types.ObjectId(dislikeReceiver);

    await Usermodel.findByIdAndUpdate(dislikedByUserId, {
      $pull: { likedTo: dislikeReceiverId },
    });

    await Usermodel.findByIdAndUpdate(dislikeReceiverId, {
      $pull: { likedBy: dislikedByUserId },
    });

    const match = await MatchModel.findOneAndUpdate(
      {
        users: { $all: [dislikedByUserId, dislikeReceiverId] },
        unmatched: false,
      },
      { unmatched: true }
    );

    if (match) {
      await Usermodel.updateMany({ _id: { $in: [dislikedByUserId, dislikeReceiverId] } }, { $pull: { matchIds: match._id } });
    }

    return 'Dislike processed and removed from like/match lists';
  } catch (error) {
    console.warn('Dislike mutation failed:', (error as Error).message);
    throw new Error('Failed to dislike user');
  }
};
