'use client';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { FollowersDialogRemove } from './FollowersDialogRemove';
import { useContext } from 'react';
import { userContext } from '@/app/(main)/layout';
import * as _ from 'lodash';

const style = {
  triggerContainer: 'text-[#262626] flex gap-1',
  dialogContent: 'p-0 w-[387px]',
  dialogContentSubContainer: 'flex items-center border-b py-2 px-4',
  header: 'text-center w-full font-bold leading-6 text-[#09090B]',
  dialogCancel: 'outline-none border-none hover:bg-white p-0 size-4',
  bottomContainer: 'px-1 flex flex-col gap-4',
  inputContainer: 'flex items-center px-3 gap-[10px] h-11',
  followersContainer: 'flex flex-col gap-3 overflow-auto h-[300px]',
  input: 'border-0 outline-none p-0 ',
};

export const FollowersDialog = ({ followers }: { followers: any }) => {
  const { users }: any = useContext(userContext);
  const sortId = _.groupBy(users, '_id');
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className={style.triggerContainer}>
          <p className="font-semibold">{followers?.length || 0}</p>
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
              {followers?.map((follow: any, i: any) => (
                <FollowersDialogRemove
                  key={i}
                  name={sortId[follow?.followerId][0]?.username}
                  img={sortId[follow?.followerId][0]?.profilePicture}
                  fullname={sortId[follow?.followerId][0]?.fullname}
                  suggest="kk"
                />
              ))}
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
