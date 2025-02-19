'use client';
import { useGetOneStoryQuery } from '@/generated';
import { StoryTop } from './StoryTop';
export const OnePersonStory = ({ userName }: { userName: string }) => {
  const { data, loading } = useGetOneStoryQuery({
    variables: {
      userName: userName,
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  const stories = data?.getOneStory[0].items;
  if (loading) return;
  if (!stories) return;
  return (
    <div className="w-fit h-[90%] flex items-center justify-center relative  mx-auto">
      <div className="w-[522px] h-full  rounded-xl relative  flex-shrink-0 border border-slate-400">
        <StoryTop stories={stories} />
      </div>
    </div>
  );
};
