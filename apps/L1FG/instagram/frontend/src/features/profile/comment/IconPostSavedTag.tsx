'use client';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { useGetUserTogetherQuery } from '@/generated';
import Post from '../../../components/profile/profilePost/Post';
import PostEmpty from '../../../components/profile/profilePost/PostEmpty';
import Posts from '@/components/svg/Posts';
import Saved from '@/components/svg/Saved';
import Tagged from '../../../components/profile/profilePost/Tagged';
import Save from '../../../components/profile/profilePost/Save';
import { TaggedIcon } from '@/components/svg/TaggedIcon';

const PageEnum = {
  POSTS: 'POSTS',
  SAVED: 'SAVED',
  TAGGED: 'TAGGED',
} as const;

type PageType = typeof PageEnum[keyof typeof PageEnum];

const NavItem = ({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) => (
  <div
    data-testid="nav-item"
    className={`flex justify-center items-center pt-6 gap-2 cursor-pointer ${active ? ' text-black border-t-[1px] border-black' : 'text-xs font-medium text-gray-500'}`}
    onClick={onClick}
  >
    <span className={active ? 'text-black' : 'text-gray-500'}>{icon}</span>
    <p className={`text-xs font-bold ${active ? 'text-black' : 'text-gray-500'}`}>{label}</p>
  </div>
);
/*eslint-disable*/
export const IconPostSavedTag = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState<PageType>(PageEnum.POSTS);
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId },
  });
  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;

  const PostNoposts = data?.getUserTogether.user?.postCount ? <Post userId={userId} /> : <PostEmpty userId={userId as string} />;

  return (
    <div data-testid="IconPostSavedTag">
      <Separator className="w-[900px]" />
      <div className="flex justify-center gap-14">
        <NavItem label="POSTS" icon={<Posts />} active={page === PageEnum.POSTS} onClick={() => setPage(PageEnum.POSTS)} />
        {isOwnerId ? <NavItem label="SAVED" icon={<Saved />} active={page === PageEnum.SAVED} onClick={() => setPage(PageEnum.SAVED)} /> : null}
        <NavItem label="TAGGED" icon={<TaggedIcon />} active={page === PageEnum.TAGGED} onClick={() => setPage(PageEnum.TAGGED)} />
      </div>

      {page === PageEnum.POSTS && PostNoposts}

      {page === PageEnum.SAVED && <Save />}
      {page === PageEnum.TAGGED && <Tagged userId={userId as string} />}
    </div>
  );
};
