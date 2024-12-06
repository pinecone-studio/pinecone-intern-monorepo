'use client';

import { useGetNotificationsByUserIdQuery } from '@/generated';
import { useContext } from 'react';
import { UserContext } from './providers';
import Image from 'next/image';

const Notifications = () => {
  const { user }: any = useContext(UserContext);

  const { data } = useGetNotificationsByUserIdQuery({
    variables: {
      userId: user ? user._id : '',
    },
  });
  const notifyData = data?.getNotificationsByUserId;

  return (
    <div className="space-y-5 divide-y divide-slate-300">
      {notifyData?.map((el, index) => {
        return (
          <div key={index} className="h-[44px] w-full bg-white flex justify-between">
            <div className="h-full w-[48px] rounded-full border relative">
              <Image className="rounded-full" alt="no pic" src={el?.userId.profilePicture!} fill />
            </div>
            <div>
              <p>{el?.userId.username}</p>
            </div>
            <div>liked your post</div>
            <div className="border w-12 relative">
              <Image src={el?.postId.images[0]!} alt="no pic" fill />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Notifications;
