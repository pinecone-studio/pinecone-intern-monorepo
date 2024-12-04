'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { FollowersDialog } from './FollowersDialog';
import { useGetFollowersByIdQuery } from '@/generated';
import { useContext } from 'react';
import { UserContext } from './providers';

const styles = {
  button: 'bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9',
  buttonFollow: 'bg-[#2563EB] py-2 px-4 text-white hover:bg-[#2563EB] h-9 w-[75px]',
  header: 'text-[20px] leading-7 font-semibold tracking-[-0.5px]',
  container: 'flex gap-x-[100px] pl-[72px]',
  textContainer: 'flex gap-1',
};

export const ProfilePageTop = ({ userProfile, postsCount }: any) => {
  const { user }: any = useContext(UserContext);

  const getFollowersById = useGetFollowersByIdQuery({ variables: { id: userProfile?._id } });

  const followers = getFollowersById?.data?.getFollowersById;

  return (
    <div className={styles.container} data-cy="Profile-page-top">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage src={userProfile?.profilePicture} className="object-cover" />
        <AvatarFallback className="uppercase text-[50px] text-[#ccc]">{userProfile?.username.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <h2 className={styles.header}>{userProfile?.username}</h2>
          {user?.username == userProfile?.username ? (
            <div className="flex gap-2">
              <Button className={styles.button}>Edit Profile</Button>
              <Button className={styles.button}>Ad tools</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button className={styles.buttonFollow}>Follow</Button>
              <Button className={styles.button}>Message</Button>
            </div>
          )}
          <Settings size={24} absoluteStrokeWidth={true} strokeWidth={1} />
        </div>
        <div className="flex gap-8 text-[#262626]">
          <div className={styles.textContainer}>
            <p className="font-semibold">{postsCount?.length || 0}</p>
            <p>posts</p>
          </div>
          <FollowersDialog followers={followers as any} />
          <div className={styles.textContainer}>
            <p className="font-semibold">0</p>
            <p>following</p>
          </div>
        </div>
        <div className="text-[14px] text-[#18181B] leading-5">
          <h3 className="font-semibold ">{userProfile?.fullname}</h3>
          <p className=" text-[#71717A] text-[12px] leading-4">product/service</p>
          <p className="font-medium">{userProfile?.bio}</p>
        </div>
      </div>
    </div>
  );
};
