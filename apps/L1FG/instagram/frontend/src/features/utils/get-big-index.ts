import { OneUserStoriesType } from '@/generated';

export const getBigIndex = ({ userName, storyTray }: { userName: string; storyTray: OneUserStoriesType[] }) => {
  const bigIndexFound = storyTray.findIndex((node) => node.user.userName == userName);
  if (bigIndexFound == -1) {
    return 0;
  }
  return bigIndexFound;
};
