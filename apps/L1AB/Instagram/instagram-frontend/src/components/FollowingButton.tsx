import { Button } from '@/components/ui/button';
import { useCreateFollowersMutation, useDeleteFollowerMutation } from '@/generated';
import { useState } from 'react';
import Loading from './Loading';
import { styles } from './ProfilePageTop';

interface FollowingButtonProps {
  isFollowing: boolean;
  setIsFollow: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  profileUserId: string;
  handleFollowersUpdate: any;
}

const FollowingButton: React.FC<FollowingButtonProps> = ({ handleFollowersUpdate, isFollowing, setIsFollow, userId, profileUserId }) => {
  const [createFollowers] = useCreateFollowersMutation();
  const [deleteFollower] = useDeleteFollowerMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    await createFollowers({ variables: { followerId: userId, followeeId: profileUserId } });
    setIsFollow(false);
    setIsLoading(false);
    handleFollowersUpdate();
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    await deleteFollower({ variables: { followerId: userId, followeeId: profileUserId } });
    setIsFollow(true);
    setIsLoading(false);
    handleFollowersUpdate();
  };

  return (
    <div className="flex gap-2 dark:text-white">
      {isFollowing ? (
        <Button className="bg-[#2563EB] py-2 px-4 text-white  hover:bg-[#2563EB] h-9 min-w-[91px]" onClick={handleFollow} data-testid="follow-button">
          {isLoading ? <Loading color={'#ffffff'} size={20} pageReload /> : 'Follow'}
        </Button>
      ) : (
        <Button className="bg-[#F4F4F5] py-2 px-4 text-[#262626] dark:bg-[#363636] dark:text-white hover:bg-[#F4F4F5] h-9  min-w-[91px]" onClick={handleUnfollow} data-testid="following-button">
          {isLoading ? <Loading size={20} pageReload /> : 'Following'}
        </Button>
      )}
      <Button className={styles.button} data-testid="message-button">
        Message
      </Button>
    </div>
  );
};

export default FollowingButton;
