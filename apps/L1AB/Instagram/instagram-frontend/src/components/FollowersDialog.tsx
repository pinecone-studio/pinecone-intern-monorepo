'use client';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { FollowersDialogRemove } from './FollowersDialogRemove';
import { useDeleteFollowerMutation } from '@/generated';

const style = {
  triggerContainer: 'text-[#262626]  flex gap-1 dark:text-white',
  dialogContent: 'p-0 w-[387px]',
  dialogContentSubContainer: 'flex items-center border-b py-2 px-4',
  header: 'text-center w-full font-bold leading-6 text-[#09090B]',
  dialogCancel: 'outline-none border-none hover:bg-white p-0 size-4',
  bottomContainer: 'px-1 flex flex-col gap-4',
  inputContainer: 'flex items-center px-3 gap-[10px] h-11',
  followersContainer: 'flex flex-col gap-3  overflow-auto h-[300px]',
  input: 'border-0 outline-none p-0 ',
};

export const FollowersDialog = ({ handleFollowersUpdate, followersData, followingData, profileUser }: any) => {
  const [deleteFollower] = useDeleteFollowerMutation();

  const handleRemoveFollower = async (id: string) => {
    await deleteFollower({ variables: { followerId: id, followeeId: profileUser._id } });

    handleFollowersUpdate();
  };

  const handleRemoveFollowing = async (id: string) => {
    await deleteFollower({ variables: { followerId: profileUser._id, followeeId: id } });

    handleFollowersUpdate();
  };
  return (
    <>
      <AlertDialog data-testId="followers-dialog">
        <AlertDialogTrigger>
          <div className={style.triggerContainer} data-testId="followers-button">
            <p className="font-semibold">{followersData?.length || 0}</p>
            <p>followers</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className={style.dialogContent}>
          <div>
            <div className={style.dialogContentSubContainer}>
              <h3 className={style.header}>Followers</h3>
              <AlertDialogCancel className={style.dialogCancel}>
                <X size={16} strokeWidth={1.6} />
              </AlertDialogCancel>
            </div>
            <div className={style.bottomContainer}>
              <div className={style.inputContainer}>
                <Search color="#71717A" strokeWidth={1} size={16} />
                <Input className={style.input} />
              </div>
              <div className={style.followersContainer}>
                {followersData?.map((follow: any, i: any) => (
                  <FollowersDialogRemove
                    handleRemoveFollower={handleRemoveFollower}
                    handleRemoveFollowing={handleRemoveFollowing}
                    type={'followers'}
                    profileUser={profileUser}
                    id={follow._id}
                    key={i}
                    name={follow.username}
                    img={follow.profilePicture}
                    fullname={follow.fullname}
                    suggest=""
                  />
                ))}
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger>
          <div className={style.triggerContainer} data-testId="following-button">
            <p className="font-semibold">{followingData?.length || 0}</p>
            <p>following</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className={style.dialogContent}>
          <div>
            <div className={style.dialogContentSubContainer}>
              <h3 className={style.header}>Following</h3>
              <AlertDialogCancel className={style.dialogCancel}>
                <X size={16} strokeWidth={1.6} />
              </AlertDialogCancel>
            </div>
            <div className={style.bottomContainer}>
              <div className={style.inputContainer}>
                <Search color="#71717A" strokeWidth={1} size={16} />
                <Input className={style.input} />
              </div>
              <div className={style.followersContainer}>
                {followingData?.map((follow: any, i: any) => (
                  <FollowersDialogRemove
                    handleRemoveFollower={handleRemoveFollower}
                    handleRemoveFollowing={handleRemoveFollowing}
                    type={'following'}
                    profileUser={profileUser}
                    id={follow._id}
                    key={i}
                    name={follow.username}
                    img={follow.profilePicture}
                    fullname={follow.fullname}
                    suggest=""
                  />
                ))}
              </div>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
