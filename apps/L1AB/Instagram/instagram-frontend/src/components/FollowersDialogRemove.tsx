import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RemoveFollowersDialog } from './RemoveFollowersDialog';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './providers';
import Link from 'next/link';
import { useCreateFollowersMutation, useDeleteFollowerMutation, User } from '@/generated';
import Loading from './Loading';

const style = {
  container: 'px-3 flex gap-3 items-center py-1',
  subContainer: 'w-full flex gap-3 items-center',
  name: 'font-medium leading-5 text-[14px]',
  fullname: 'text-[12px] leading-4 text-[#71717A]',
  suggest: 'text-[10px] leading-4 text-[#71717A]',
};

interface FollowersDialogRemoveProps {
  id: string;
  name: string;
  img: string;
  fullname?: string;
  suggest?: string;
  type: 'followers' | 'following';
  profileUser: { _id: string; username: string };
  handleRemoveFollowing: any;
  handleRemoveFollower: any;
}

export const FollowersDialogRemove = ({ id, name, img, fullname, suggest, type, profileUser, handleRemoveFollowing, handleRemoveFollower }: FollowersDialogRemoveProps) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const { user, sortedUsers }: any = useContext(UserContext);

  const [createFollowers] = useCreateFollowersMutation();
  const [deleteFollower] = useDeleteFollowerMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const isFollowing = sortedUsers?.some((el: User) => el._id === id);
    setIsFollow(isFollowing);
  }, [id, sortedUsers]);

  const handleFollow = async () => {
    setIsLoading(true);
    await createFollowers({ variables: { followerId: user?._id, followeeId: id } });
    setIsFollow(false);
    setIsLoading(false);
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    await deleteFollower({ variables: { followerId: user?._id, followeeId: id } });
    setIsFollow(true);
    setIsLoading(false);
  };

  const renderFollowButton = () => {
    if (isFollow) {
      return (
        <Button role="button" className="bg-[#2563EB] py-2 px-4 text-white hover:bg-[#2563EB] h-9 min-w-[91px]" onClick={handleFollow} disabled={isLoading}>
          {isLoading ? <Loading size={20} color="white" pageReload /> : 'Follow'}
        </Button>
      );
    } else {
      return (
        <Button role="button" className="bg-[#F4F4F5] py-2 px-4 text-[#262626] hover:bg-[#F4F4F5] h-9 min-w-[91px]" onClick={handleUnfollow} disabled={isLoading}>
          {isLoading ? <Loading size={20} pageReload /> : 'Following'}
        </Button>
      );
    }
  };

  const getActionButton = () => {
    if (user?._id === id) {
      return null;
    }
    if (username === user?.username) {
      return <RemoveFollowersDialog profileUser={profileUser} id={id} img={img} type={type} name={name} handleRemoveFollower={handleRemoveFollower} handleRemoveFollowing={handleRemoveFollowing} />;
    } else {
      return renderFollowButton();
    }
  };

  return (
    <div className={style.container}>
      <Link href={`/profile?type=posts&username=${name}`} className={style.subContainer}>
        <Avatar className="w-11 h-11">
          <AvatarImage src={img} alt={name} className="object-cover" />
          <AvatarFallback>{name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className={style.name}>{name}</h3>
          {fullname && <p className={style.fullname}>{fullname}</p>}
          {suggest && <p className={style.suggest}>{suggest}</p>}
        </div>
      </Link>
      {getActionButton()}
    </div>
  );
};
