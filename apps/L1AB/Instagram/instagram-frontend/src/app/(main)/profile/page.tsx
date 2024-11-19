'use client';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { ProfilePageTop } from '@/components/ProfilePageTop';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile?type=posts');
  }, []);
  return (
    <div className="py-[36px] flex flex-col gap-[59px] max-h-screen overflow-auto">
      <ProfilePageTop profileImg="https://github.com/shadcn.png" profileUsername="test" postCount="2" followersCount="3" followingCount="4" profileFullname="test" description="test" />
      <ProfilePagePosts postImage="https://github.com/shadcn.png" />
    </div>
  );
};
export default Page;
