'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { FollowersDialog } from './FollowersDialog';
import { useContext } from 'react';
import { userContext } from '@/app/(main)/layout';
import { useGetFollowersByIdQuery } from '@/generated';

const styles = {
  button: 'bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9',
  header: 'text-[20px] leading-7 font-semibold tracking-[-0.5px]',
  container: 'flex gap-x-[100px] pl-[72px]',
  textContainer: 'flex gap-1',
};

export const ProfilePageTop = () => {
  const { user }: any = useContext(userContext);
  const { data } = useGetFollowersByIdQuery({ variables: { id: user?._id } });
  console.log(data, 'getfollowers');
  return (
    <div className={styles.container} data-cy="Profile-page-top">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage src={user?.profilePicture} className="object-cover" />
        <AvatarFallback className="uppercase text-[50px] text-[#ccc]">{user?.username.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <h2 className={styles.header}>{user?.username}</h2>
          <div className="flex gap-2">
            <Button className={styles.button}>Edit Profile</Button>
            <Button className={styles.button}>Ad tools</Button>
          </div>
          <Settings size={24} absoluteStrokeWidth={true} strokeWidth={1} />
        </div>
        <div className="flex gap-8 text-[#262626]">
          <div className={styles.textContainer}>
            <p className="font-semibold">2</p>
            <p>posts</p>
          </div>
          <FollowersDialog followersCount="4" />
          <div className={styles.textContainer}>
            <p className="font-semibold">3</p>
            <p>following</p>
          </div>
        </div>
        <div className="text-[14px] text-[#18181B] leading-5">
          <h3 className="font-semibold ">{user?.fullname}</h3>
          <p className=" text-[#71717A] text-[12px] leading-4">product/service</p>
          <p className="font-medium">{user?.bio}</p>
        </div>
      </div>
    </div>
  );
};
