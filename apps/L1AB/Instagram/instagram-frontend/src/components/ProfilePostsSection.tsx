'use client';
import { useSearchParams } from 'next/navigation';
import { styles } from './ProfilePagePosts';
import Image from 'next/image';
import { ProfilePageFirstPost } from './ProfilePageFirstPost';
import { ProfilePageNoPostYet } from './ProfilePageNoPostYet';
import ProfilePagePrivate from './ProfilePagePrivate';

const ProfilePostsSection = ({ userPosts, profileUser, isFollow, user }: any) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const username = searchParams.get('username');

  const checkUser = (userUsername: any, username: any) => {
    if (userUsername == username) {
      return <ProfilePageFirstPost />;
    } else {
      return <ProfilePageNoPostYet />;
    }
  };
  const privateCheck = (isPrivate: any) => {
    if (isPrivate == true) {
      return <ProfilePagePrivate />;
    } else {
      return <ProfilePageNoPostYet />;
    }
  };
  return (
    <>
      {type == 'posts' && userPosts?.length > 0 ? (
        <div className={styles.postsContainer}>
          {userPosts?.map((post: any, i: any) => (
            <div key={i} className={styles.imageContainer}>
              <Image src={post.images[0]} objectFit="cover" fill alt="post" />
            </div>
          ))}
        </div>
      ) : (
        <>{isFollow ? privateCheck(profileUser?.isPrivate) : checkUser(user?.username, username)}</>
      )}
    </>
  );
};

export default ProfilePostsSection;
