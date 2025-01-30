import { Post, PostInput, User } from '../../../generated';
import { PostModel, UserModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import { BadUserInputError, CreationError, UserNotFoundError } from '../../../utils/error';

export const validatePost = async (userId: string | null, input: PostInput): Promise<User> => {
  try {
    const postCreator: User | null = await UserModel.findById(userId);
    if (!postCreator) {
      throw new UserNotFoundError('Пост үүсгэгч олдсонгүй');
    }
    const { postImage } = input;
    const carouselMediaCount = postImage.length;
    if (carouselMediaCount > 10) {
      throw new BadUserInputError('10 аас дээш зураг авч болохгүй');
    }
    return postCreator;
  } catch (error) {
    throw catchError(error);
  }
};
export const addPostToDatabase = async (userId: string | null, input: PostInput): Promise<Post> => {
  try {
    const { postImage, caption } = input;
    const carouselMediaCount = postImage.length;
    const newPost: Post | null = await PostModel.create({
      postImage,
      caption,
      userId,
      carouselMediaCount,
    });
    if (!newPost) {
      throw new CreationError('Failed to create a post');
    }
    return newPost as Post;
  } catch (error) {
    throw catchError(error);
  }
};

// eslint-disable-next-line complexity
export const updatePostCreator = async (userId: string | null, newPost: Post, postCreator: User) => {
  try {
    let updatedPostCreator: User | null = await UserModel.findByIdAndUpdate(userId, { $inc: { postCount: 1 } }, { new: true });
    let updateFollowerTry = 0;

    while (!updatedPostCreator || postCreator.postCount >= updatedPostCreator.postCount) {
      if (updateFollowerTry > 1) {
        break;
      }
      updatedPostCreator = await UserModel.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } }, { new: true });
      updateFollowerTry++;
    }
    if (!updatedPostCreator || postCreator.postCount >= updatedPostCreator.postCount) {
      await PostModel.findByIdAndDelete(newPost._id);
      throw new CreationError('Failed to create a post');
    }
  } catch (error) {
    throw catchError(error);
  }
};
