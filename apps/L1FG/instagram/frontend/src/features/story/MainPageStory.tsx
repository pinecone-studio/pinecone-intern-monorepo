'use client';
import Link from 'next/link';
import { useGetPreviewAllStoriesQuery } from '@/generated';
import { AvatarForStory } from './AvatarForStory';

const MainPageStory = () => {
  const { data } = useGetPreviewAllStoriesQuery();
  const formatUsername = (username: string) => {
    if (username.length >= 10) {
      return `${username.slice(0, 9)}...`;
    }
    return username;
  };
  console.log('stories:', data);
  return (
    <div className="flex gap-4 w-[630px] h-[70px]">
      {data?.getPreviewAllStories.storyTray.map((node) => {
        const hasStoryToSee = node?.user?.latestStoryTimestamp > node?.user?.seenStoryTime;
        const image = node?.user?.profileImage;
        return (
          <Link href={`/stories/${node.user.userName}/${node.latestStoryId}?lot=true`} key={node._id}>
            <div className="flex flex-col gap-2 mt-[25px] w-fit">
              <AvatarForStory hasStoryToSee={hasStoryToSee} image={image} />
              <span className="text-xs font-normal text-[#262626] text-center" title={node.user.userName}>
                {formatUsername(node.user.userName)}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MainPageStory;
