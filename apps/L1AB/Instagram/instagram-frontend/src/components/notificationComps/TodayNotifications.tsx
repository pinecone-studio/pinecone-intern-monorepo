import { GetNotificationsByUserIdQuery } from '@/generated';
import { timeAgoCompact } from '@/utils/date-utils';
import { parseISO } from 'date-fns';
import Image from 'next/image';

interface PropsType {
  todayNotifications: GetNotificationsByUserIdQuery['getNotificationsByUserId'];
}

const TodayNotifications = ({ todayNotifications }: PropsType) => {
  return (
    <div>
      {todayNotifications.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-4  dark:text-black">Today</h3>
          <div className="flex flex-col gap-4">
            {todayNotifications.map((el, index) => {
              const createdAt = parseISO(el.createdAt);
              if (el.type !== 'follow') {
                return (
                  <div key={index} className="h-[44px] w-full bg-white  dark:bg-black flex gap-3">
                    <div className="h-full w-[44px] rounded-full relative">
                      <div>
                        <Image className="rounded-full object-cover" alt="no pic" src={el.userId.profilePicture} fill />
                      </div>
                    </div>
                    <div className="flex w-3/5 gap-1 h-full items-center">
                      <div className="font-bold">{el?.userId.username}</div>
                      <div>
                        {(() => {
                          switch (el.type) {
                            case 'like':
                              return <div>liked your post.</div>;
                            case 'comment':
                              return <div>commented on your post.</div>;
                          }
                        })()}
                      </div>
                      <div className="text-sm text-gray-500">{timeAgoCompact(createdAt)}</div>
                    </div>
                    <div className="w-[44px] relative">{el?.postId?.images?.[0] && <Image src={el.postId.images[0]} alt="no pic" fill className="rounded-sm" />}</div>
                  </div>
                );
              } else
                return (
                  <div key={index} className="h-[44px] w-full bg-white dark:bg-black flex gap-3">
                    <div className="h-full w-[44px] rounded-full relative">
                      <div>
                        <Image className="rounded-full" alt="no pic" src={el.userId.profilePicture} fill />
                      </div>
                    </div>
                    <div className="flex w-fit gap-1 h-full items-center">
                      <div className="font-bold">{el?.userId.username}</div>
                      <div>started following you.</div>
                      <div className="text-sm text-gray-500">{timeAgoCompact(createdAt)}</div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default TodayNotifications;
