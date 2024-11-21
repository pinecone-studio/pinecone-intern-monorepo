'use client';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { ProfilePageTop } from '@/components/ProfilePageTop';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { userContext } from '../layout';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile?type=posts');
  }, []);

  const { user }: any = useContext(userContext);
  return (
    <div className="py-[36px] flex flex-col gap-[59px] max-h-screen overflow-auto">
      <ProfilePageTop
        profileImg={user && user.profilePicture}
        profileUsername={user && user.username}
        postCount="2"
        followersCount="3"
        followingCount="4"
        profileFullname={user && user.fullname}
        description={user && user.bio}
      />
      <ProfilePagePosts postImage="https://github.com/shadcn.png" />
    </div>
  );
};
export default Page;
