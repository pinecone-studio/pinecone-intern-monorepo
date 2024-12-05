'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const style = {
  remove: 'bg-[#F4F4F5] hover:bg-[#F4F4F5] text-[#18181B] h-9 py-2 px-4 rounded-lg flex items-center justify-center text-[14px]',
  container: 'flex flex-col justify-center items-center w-[324px] h-[244px] gap-4 p-6',
  button: 'h-9 bg-white hover:bg-white border',
  desc: 'text-center leading-5 text-[14px] font-light',
  header: 'text-[18px] font-semibold leading-7',
};

interface RemoveFollowersDialogProps {
  id: string;
  img: string;
  type: 'followers' | 'following';
  name: string;
  profileUser: { _id: string; username: string };
  handleRemoveFollowing: any;
  handleRemoveFollower: any;
}

const RemoveDialogContent = ({
  type,
  name,
  img,
  handleRemoveAction,
}: {
  type: 'followers' | 'following';
  name: string;
  img: string;
  id: string;
  profileUser: { _id: string };
  handleRemoveAction: () => void;
}) => {
  const actionText = type === 'followers' ? 'Remove follower?' : 'Remove following?';
  const descriptionText = type === 'followers' ? `Instagram won’t tell ${name} they were removed from your followers.` : `Instagram won’t tell ${name} they were removed from your following.`;

  return (
    <>
      <Avatar className="w-[52px] h-[52px]">
        <AvatarImage src={img} alt={name} />
        <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
      </Avatar>

      <AlertDialogHeader className={style.header}>{actionText}</AlertDialogHeader>
      <AlertDialogDescription className={style.desc}>{descriptionText}</AlertDialogDescription>
      <AlertDialogFooter>
        <AlertDialogCancel className={style.button}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleRemoveAction} className={`${style.button} text-[#EF4444]`} data-testId="remove-button">
          Remove
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export const RemoveFollowersDialog = ({ id, img, type, name, profileUser, handleRemoveFollower, handleRemoveFollowing }: RemoveFollowersDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={style.remove} data-testId="remove-trigger">
        Remove
      </AlertDialogTrigger>
      <AlertDialogContent className={style.container}>
        <RemoveDialogContent
          type={type}
          name={name}
          img={img}
          id={id}
          profileUser={profileUser}
          handleRemoveAction={type === 'followers' ? () => handleRemoveFollower(id) : () => handleRemoveFollowing(id)}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
