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

export const RemoveFollowersDialog = ({ img }: { img: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={style.remove}>Remove</AlertDialogTrigger>
      <AlertDialogContent className={style.container}>
        <Avatar className="w-[52px] h-[52px]">
          <AvatarImage src={img} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <AlertDialogHeader className={style.header}>Remove follower?</AlertDialogHeader>
        <AlertDialogDescription className={style.desc}>Instagram won’t tell fildsdas they were removed from your followers.</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className={style.button}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={`${style.button} text-[#EF4444]`}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
