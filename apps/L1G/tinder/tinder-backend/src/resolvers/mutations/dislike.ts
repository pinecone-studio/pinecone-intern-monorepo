import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import mongoose from 'mongoose';
import { DislikeArgs } from 'src/types';

interface DislikeResponse {
  isMatch: boolean;
  message: string;
}

export const dislike = async (_: unknown, args: DislikeArgs): Promise<DislikeResponse> => {
  const { dislikedByUser, dislikeReceiver } = args;

  try {
    const dislikedByUserId = new mongoose.Types.ObjectId(dislikedByUser);
    const dislikeReceiverId = new mongoose.Types.ObjectId(dislikeReceiver);

    // likedTo / likedBy устгах
    await Usermodel.findByIdAndUpdate(dislikedByUserId, {
      $pull: { likedTo: dislikeReceiverId },
    });
    await Usermodel.findByIdAndUpdate(dislikeReceiverId, {
      $pull: { likedBy: dislikedByUserId },
    });

    // Хэрэв match байгаа бол
    const match = await MatchModel.findOne({
      users: { $all: [dislikedByUserId, dislikeReceiverId] },
      unmatched: false,
    });

    if (match) {
      // Match-ийг устгах
      await MatchModel.deleteOne({ _id: match._id });

      // Хэрэглэгчдийн matchIds массивнаас устгах
      await Usermodel.updateMany(
        { _id: { $in: [dislikedByUserId, dislikeReceiverId] } },
        { $pull: { matchIds: match._id } }
      );
    }

    return {
      isMatch: false,
      message: 'Successfully unmatched and removed match',
    };
  } catch (error) {
    console.warn('Dislike mutation failed:', (error as Error).message);
    throw new Error('Failed to dislike user');
  }
};
