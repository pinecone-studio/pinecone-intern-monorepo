'use client';
import { useSearchParams } from 'next/navigation';
import { styles } from './ProfilePagePosts';
import Image from 'next/image';
import { ProfilePageFirstPost } from './ProfilePageFirstPost';
import { ProfilePageNoPostYet } from './ProfilePageNoPostYet';
import ProfilePagePrivate from './ProfilePagePrivate';
import { useGetAllSavedPostsQuery, useGetCommentsByPostIdQuery, useGetLikesByPostIdQuery } from '@/generated';
import { Heart, MessageCircle } from 'lucide-react';

export const ReactionContainer = ({ postId }: { postId: string }) => {
  const { data: likedata } = useGetLikesByPostIdQuery({ variables: { postId } });
  const likesData = likedata?.getLikesByPostId;

  const { data: commentData } = useGetCommentsByPostIdQuery({ variables: { postId } });
  const commentsData = commentData?.getCommentsByPostId;

  return (
    <div data-Testid="reaction" className={styles.reactionContainer}>
      <div className="flex gap-2 items-center">
        <Heart fill="white" size={20} />
        <p className="font-semibold">{likesData?.length}</p>
      </div>
      <div className="flex gap-2 items-center">
        <MessageCircle fill="white" size={20} />
        <p className="font-semibold">{commentsData?.length}</p>
      </div>
    </div>
  );
};

const ProfilePostsSection = ({ userPosts, profileUser, isFollow, user }: any) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const username = searchParams.get('username');

  const { data } = useGetAllSavedPostsQuery({
    variables: { userId: profileUser?._id || '' },
  });

  const savedPosts = data?.getAllSavedPosts;

  const renderPosts = () => {
    console.log(userPosts);
    if (type === 'posts' && userPosts?.length > 0) {
      return (
        <div className={styles.postsContainer}>
          {userPosts
            .slice()
            .reverse()
            .map((post: any, i: any) => {
              console.log(post.images[0]);

              return (
                <div key={i} className={styles.imageContainer}>
                  <div className={styles.opacityContainer}></div>
                  <ReactionContainer postId={post._id} />
                  <Image src={post.images[0]} objectFit="cover" fill alt="post" />
                </div>
              );
            })}
        </div>
      );
    }

    if (type === 'saved') {
      return (
        <div className={styles.postsContainer}>
          {savedPosts
            ?.slice()
            .reverse()
            .map((post: any, i: any) => (
              <div key={i} className={styles.imageContainer}>
                <div className={styles.opacityContainer}></div>
                <ReactionContainer postId={post.postId._id} />
                <Image src={post.postId.images[0]} objectFit="cover" fill alt="post" />
              </div>
            ))}
        </div>
      );
    }
  };

  const hasContent = (type === 'posts' && userPosts?.length > 0) || (type === 'saved' && savedPosts?.length !== 0);

  const renderProfileFallback = () => {
    if (hasContent) return null;

    return isFollow ? renderPrivateProfile() : renderUserProfileFallback();
  };

  const renderPrivateProfile = () => {
    return profileUser?.isPrivate ? <ProfilePagePrivate /> : <ProfilePageNoPostYet />;
  };
  const renderUserProfileFallback = () => {
    return user?.username === username ? <ProfilePageFirstPost /> : <ProfilePageNoPostYet />;
  };

  return (
    <>
      {renderPosts()}
      {renderProfileFallback()}
    </>
  );
};

export default ProfilePostsSection;
