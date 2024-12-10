import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useGetFollowersByIdQuery, useGetFollowingByIdQuery, User } from '@/generated';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './providers';
import Link from 'next/link';
import FollowingButton from './FollowingButton';
import { FollowersDialog } from './FollowersDialog';

export const styles = {
  button: 'bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9',
  buttonFollow: 'bg-[#2563EB] py-2 px-4 text-white hover:bg-[#2563EB] h-9 min-w-[91px]',
  header: 'text-[20px] leading-7 font-semibold tracking-[-0.5px]',
  container: 'flex gap-x-[100px] pl-[72px]',
  textContainer: 'flex gap-1',
};

export const ProfilePageTop = ({ userProfile, postsCount }: any) => {
  const { user, sortedUsers }: any = useContext(UserContext);

  const [isFollow, setIsFollow] = useState<boolean>(false);
  const { data: followers, refetch: refetchFollowers } = useGetFollowersByIdQuery({ variables: { id: userProfile?._id } });
  const { data: following, refetch: refetchFollowing } = useGetFollowingByIdQuery({ variables: { id: userProfile?._id } });

  const followingData = following?.getFollowingById;
  const followersData = followers?.getFollowersById;

  useEffect(() => {
    const isFollowing = sortedUsers?.some((el: User) => el._id === userProfile?._id);
    setIsFollow(isFollowing);
  }, [userProfile, sortedUsers]);

  const handleFollowersUpdate = () => {
    refetchFollowers();
    refetchFollowing();
  };
  return (
    <div className={styles.container} data-cy="Profile-page-top">
      <Avatar className="w-[150px] h-[150px]">
        <AvatarImage src={userProfile?.profilePicture} className="object-cover" />
        <AvatarFallback className="uppercase text-[50px] text-[#ccc]">{userProfile?.username.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <h2 className={styles.header}>{userProfile?.username}</h2>
          {user?.username === userProfile?.username ? (
            <div className="flex gap-2">
              <Link href={'editprofile'}>
                <Button className={styles.button} data-testid="edit-profile-button">
                  Edit Profile
                </Button>
              </Link>
              <Button className={styles.button} data-testid="ad-tools-button">
                Ad tools
              </Button>
            </div>
          ) : (
            <FollowingButton isFollowing={isFollow} setIsFollow={setIsFollow} userId={user?._id} profileUserId={userProfile?._id} handleFollowersUpdate={handleFollowersUpdate} />
          )}
          <Settings size={24} absoluteStrokeWidth={true} strokeWidth={1} />
        </div>
        <div className="flex gap-8 text-[#262626]">
          <div className={styles.textContainer}>
            <p className="font-semibold">{postsCount?.length || 0}</p>
            <p>posts</p>
          </div>
          <FollowersDialog isFollow={isFollow} profileUser={userProfile} following={null} followersData={followersData} followingData={followingData} handleFollowersUpdate={handleFollowersUpdate} />
        </div>
        <div className="text-[14px] text-[#18181B] leading-5">
          <h3 className="font-semibold">{userProfile?.fullname}</h3>
          <p className=" text-[#71717A] text-[12px] leading-4">product/service</p>
          <p className="font-medium">{userProfile?.bio}</p>
        </div>
      </div>
    </div>
  );
};
