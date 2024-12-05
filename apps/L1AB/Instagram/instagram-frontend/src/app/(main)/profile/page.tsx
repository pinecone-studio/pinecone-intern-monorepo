'use client';
import { ProfilePagePosts } from '@/components/ProfilePagePosts';
import { ProfilePageTop } from '@/components/ProfilePageTop';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetPostByUserIdQuery, useGetUserByUsernameQuery } from '@/generated';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/profile?username=${username}&type=posts`);
  }, []);

  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const getUserByUsername = useGetUserByUsernameQuery({
    variables: { username: username || '' },
  });
  const userData = getUserByUsername?.data?.getUserByUsername;

  const getPostByUserId = useGetPostByUserIdQuery({
    variables: { userId: userData?._id || '' },
  });
  const posts = getPostByUserId.data?.getPostByUserId;

  return (
    <div className="py-[36px] flex flex-col gap-[59px] max-h-screen overflow-auto">
      <ProfilePageTop userProfile={userData} postsCount={posts} />
      <ProfilePagePosts userPosts={posts as any} userProfile={userData as any} />
    </div>
  );
};
export default Page;
