'use client';
import { useSearchParams } from 'next/navigation';
import { styles } from './ProfilePagePosts';
import Image from 'next/image';
import { ProfilePageFirstPost } from './ProfilePageFirstPost';
import { ProfilePageNoPostYet } from './ProfilePageNoPostYet';
import ProfilePagePrivate from './ProfilePagePrivate';
import { useGetAllSavedPostsQuery } from '@/generated';

const ProfilePostsSection = ({ userPosts, profileUser, isFollow, user }: any) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const username = searchParams.get('username');

  const { data } = useGetAllSavedPostsQuery({
    variables: { userId: profileUser?._id || '' },
  });
  const savedPosts = data?.getAllSavedPosts;

  const renderPosts = () => {
    if (type === 'posts' && userPosts?.length > 0) {
      return (
        <div className={styles.postsContainer}>
          {userPosts.map((post: any, i: any) => (
            <div key={i} className={styles.imageContainer}>
              <Image src={post.images[0]} objectFit="cover" fill alt="post" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={styles.postsContainer}>
        {savedPosts?.map((post: any, i: any) => (
          <div key={i} className={styles.imageContainer}>
            <Image src={post.postId.images[0]} objectFit="cover" fill alt="post" />
          </div>
        ))}
      </div>
    );
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
