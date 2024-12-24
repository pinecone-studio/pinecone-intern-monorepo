'use client';
import ProfilePostsSection from './ProfilePostsSection';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './providers';
import { User } from '@/generated';
import ProfilePagePostsAndSaved from './ProfilePagePostsAndSaved';
import Loading from './Loading';

export const styles = {
  button: 'bg-white hover:bg-white   text-[#2563EB] font-medium leading-5 text-[14px] outline-none',
  selected: 'flex dark:text-white gap-[7px] items-center dark:border-white relative py-[17px] border-t-[1.5px] border-[#09090B] text-[#09090B] cursor-pointer',
  notSelected: 'flex gap-[7px] items-center py-[17px] text-[#71717A] cursor-pointer ',
  line: 'border-[#E4E4E7]  dark:border-[#71717A]  border-t-[1px] w-[935px] flex justify-center uppercase gap-12',
  imageContainer: 'relative w-[309px] h-[309px] group ',
  opacityContainer: 'absolute w-full h-full bg-black z-10 opacity-0 group-hover:opacity-30 ',
  reactionContainer: 'absolute w-full h-full flex gap-6 z-20 text-white flex gap-4 justify-center items-center invisible group-hover:visible',
  postsContainer: 'grid grid-cols-3 gap-1 pb-9',
  container: 'flex flex-col gap-4 min-h-full dark: ',
  textContainer: 'w-[935px] mt-7 text-center flex flex-col gap-4 text-[12px] text-[#71717A] leading-4',
};

export const ProfilePagePosts = ({ userPosts, userProfile, loading }: any) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const { user, sortedUsers }: any = useContext(UserContext);

  useEffect(() => {
    if (userProfile?._id && sortedUsers) {
      const isFollowing = sortedUsers?.some((el: User) => el._id === userProfile._id);
      setIsFollow(isFollowing);
    }
  }, [userProfile, sortedUsers]);
  return (
    <div className={styles.container} data-cy="Profile-page-posts">
      <div className={styles.line}>{userProfile?.isPrivate == true ? isFollow ? null : <ProfilePagePostsAndSaved user={user} /> : <ProfilePagePostsAndSaved user={user} />}</div>
      {loading ? <Loading size={30} /> : <ProfilePostsSection userPosts={userPosts} profileUser={userProfile} isFollow={isFollow} user={user} />}
      <div className={styles.textContainer}>
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p>© 2024 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};
