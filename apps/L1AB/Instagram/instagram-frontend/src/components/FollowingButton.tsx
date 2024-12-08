import { Button } from '@/components/ui/button';
import { styles } from './ProfilePageTop';
import { useCreateFollowersMutation, useDeleteFollowerMutation } from '@/generated';

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

  const handleFollow = async () => {
    await createFollowers({ variables: { followerId: userId, followeeId: profileUserId } });
    setIsFollow(false);
    handleFollowersUpdate();
  };

  const handleUnfollow = async () => {
    await deleteFollower({ variables: { followerId: userId, followeeId: profileUserId } });
    setIsFollow(true);
    handleFollowersUpdate();
  };

  return (
    <div className="flex gap-2">
      {isFollowing ? (
        <Button className={styles.buttonFollow} onClick={handleFollow} data-testid="follow-button">
          Follow
        </Button>
      ) : (
        <Button className={styles.button} onClick={handleUnfollow} data-testid="following-button">
          Following
        </Button>
      )}
      <Button className={styles.button} data-testid="message-button">
        Message
      </Button>
    </div>
  );
};

export default FollowingButton;
