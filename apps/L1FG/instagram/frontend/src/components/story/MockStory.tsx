import Story from './Story';

type StoryType = {
  id: number;
  username: string;
  time: string;
  gradient: string;
  views: string;
};

export const StoriesMock = () => {
  const stories: StoryType[] = [
    {
      id: 1,
      username: 'defours',
      time: '5h',
      gradient: 'from-purple-500 to-pink-500',
      views: '56',
    },
    {
      id: 2,
      username: 'upxox_',
      time: '3h',
      gradient: 'from-blue-500 to-indigo-500',
      views: '56',
    },
    {
      id: 3,
      username: 'defours_dots',
      time: '10m',
      gradient: 'from-green-500 to-teal-500',
      views: '56',
    },
    {
      id: 4,
      username: 'roses_are_rosie',
      time: '10m',
      gradient: 'from-orange-500 to-red-500',
      views: '56',
    },
    {
      id: 5,
      username: 'photo_lover',
      time: '15m',
      gradient: 'from-pink-500 to-rose-500',
      views: '56',
    },
    {
      id: 6,
      username: 'photo_lover',
      time: '15m',
      gradient: 'from-pink-500 to-rose-500',
      views: '56',
    },
    {
      id: 7,
      username: 'photo_lover',
      time: '15m',
      gradient: 'from-pink-500 to-rose-500',
      views: '56',
    },
    {
      id: 8,
      username: 'photo_lover',
      time: '15m',
      gradient: 'from-pink-500 to-rose-500',
      views: '56',
    },
    {
      id: 9,
      username: 'photo_lover',
      time: '15m',
      gradient: 'from-pink-500 to-rose-500',
      views: '56',
    },
  ];

  return (
    <div>
      <Story stories={stories} />
    </div>
  );
};
