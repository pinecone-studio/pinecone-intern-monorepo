import { PostsEdge, QueryResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import { UnauthenticatedError } from '../../../utils/error';
import { firstThreePosts } from '../../user/profile-preview-type/first-three-posts';

export const getProfilePreview: QueryResolvers['getProfilePreview'] = async (_, { searchingUserId }, { userId }) => {
  try {
    if (!userId) {
      throw new UnauthenticatedError('Та нэвтэрнэ үү');
    }
    const searchingUser = await UserModel.findById(searchingUserId);
    const viewer = await UserModel.findById(userId);
    const edges: PostsEdge[] = await firstThreePosts({ searchingUserId: searchingUserId });
    return {
      searchingUserId: searchingUserId,
      user: searchingUser,
      viewer: viewer,
      firstThreePosts: edges,
    };
  } catch (error) {
    throw catchError(error);
  }
};
