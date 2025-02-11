import { Comment } from '../../../generated';
import { CommentModel } from '../../../models/comment.model';

export const contentComment = async ({ contentCommentId }: { contentCommentId: string | null }, _: unknown, __: unknown) => {
  if (!contentCommentId) {
    return null;
  }

  const foundComment: Comment | null = await CommentModel.findById({ _id: contentCommentId });

  if (!foundComment) {
    throw new Error('not found comment');
  }
  const comment = foundComment.comment;

  return comment;
};
