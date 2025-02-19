import { OneStoryType } from '@/generated';

export const StoryProgress = ({ stories }: { stories: OneStoryType[] }) => {
  const count = stories.length;
  return (
    <div className={`w-full grid gap-[2px] grid-cols-${count} `}>
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <div key={i} className="h-[2px] w-full bg-white rounded-[2px] "></div>
      ))}
    </div>
  );
};
