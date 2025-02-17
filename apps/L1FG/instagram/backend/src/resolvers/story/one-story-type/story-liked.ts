import { StoryLikeModal } from '../../../models';
import { authenticate } from '../../../utils/authenticate';

export const storyLiked = async ({ _id }: { _id: string }, _: unknown, { userId }: { userId: string | null }) => {
  authenticate(userId);
  const storyLiked = await StoryLikeModal.findOne({
    userId: userId,
    storyId: _id,
  });
  const hasLiked = storyLiked ? true : false;
  return hasLiked;
};
