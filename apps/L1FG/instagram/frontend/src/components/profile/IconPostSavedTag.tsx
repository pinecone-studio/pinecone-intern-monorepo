'use client';
import { Tag } from 'lucide-react';
import Posts from '../svg/Posts';
import Saved from '../svg/Saved';
import { useState } from 'react';
import Post from './Post';
import Save from './Save';
import Tagged from './Tagged';
import { Separator } from '@/components/ui/separator';

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

export const IconPostSavedTag = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState<PageType>(PageEnum.POSTS);
  // const { data } = useGetUserTogetherQuery({
  //   variables: { searchingUserId: userId },
  // });

  // const PostNoposts = data?.getUserTogether.user?.postCount ? <Post userId={userId} /> : <PostEmpty />;

  return (
    <div data-testid="IconPostSavedTag">
      <Separator className="w-[935px]" />
      <div className="flex justify-center gap-14">
        <NavItem label="POSTS" icon={<Posts />} active={page === PageEnum.POSTS} onClick={() => setPage(PageEnum.POSTS)} />
        <NavItem label="SAVED" icon={<Saved />} active={page === PageEnum.SAVED} onClick={() => setPage(PageEnum.SAVED)} />
        <NavItem label="TAGGED" icon={<Tag className="h-4 w-4" />} active={page === PageEnum.TAGGED} onClick={() => setPage(PageEnum.TAGGED)} />
      </div>

      {page === PageEnum.POSTS && <Post userId={userId as string} />}
      {page === PageEnum.SAVED && <Save />}
      {page === PageEnum.TAGGED && <Tagged />}
    </div>
  );
};
