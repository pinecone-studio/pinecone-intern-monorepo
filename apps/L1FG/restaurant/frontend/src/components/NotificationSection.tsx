'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useGetOrdersForUserQuery } from '@/generated';
import { Bell, BellRing } from 'lucide-react';
import { useOrder } from './providers';

const statusMessages = {
  Pending: 'Таны захиалсан хоол баталгаажлаа.',
  InProcess: 'Таны захиалга хийгдэж эхэллээ.',
  Ready: 'Таны захиалга бэлтгэгдэж дууслаа.',
  Done: 'Таны захиалга амжилттай хүргэгдлээ.',
};

const statusLabels = {
  Pending: 'Хүлээгдэж буй',
  InProcess: 'Бэлтгэгдэж буй',
  Ready: 'Хүргэгдсэн',
  Done: 'Дууссан',
};

interface OrderType {
  isRead: boolean;
  _id: string;
  status: 'Pending' | 'InProcess' | 'Ready' | 'Done';
  createdAt: Date;
}

const NotificationSection = () => {
  const [notifs, setNotifs] = useState<OrderType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { markOrderAsRead } = useOrder();
  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;
      setUserId(parsedUser._id);
    } catch {
      toast.error('Та нэвтэрч орно уу!');
    }
  }, []);

  const { data, loading, refetch } = useGetOrdersForUserQuery({
    variables: { userId: userId || '' },
    skip: !userId,
  });

  useEffect(() => {
    if (data?.getOrdersForUser) {
      const sortedOrders = data.getOrdersForUser.filter((order): order is OrderType => order !== null).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setNotifs(sortedOrders);
    }
  }, [data]);

  const unreadOrders = notifs.filter((notif) => !notif.isRead);
  if (!loading) refetch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" aria-label="Мэдэгдлүүд" data-testid="notification-button">
          <Bell width={16} className="text-gray-700 hover:text-black transition" data-testid="openNotification" />
          {unreadOrders.length > 0 && (
            <span className="absolute top-0 left-6 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center" data-testid="unread-count">
              {unreadOrders.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-2 w-11/12 overflow-scroll" data-testid="notification-sheet">
        <SheetHeader className="flex justify-start items-center p-4">
          <h2 className="text-lg font-bold" data-testid="notification-header">
            Мэдэгдлүүд
          </h2>
        </SheetHeader>

        <div className="flex flex-col space-y-3 px-2" data-testid="notification-list">
          {notifs.map((notif, index) => (
            <div
              key={notif._id}
              className={`w-full cursor-pointer border rounded-xl shadow-sm ${!notif.isRead ? 'bg-gray-50 rounded-xl border-gray-400' : ''} `}
              onClick={() => markOrderAsRead(notif._id)}
              data-testid={`order${index}`}
            >
              <div className={`flex justify-between items-center p-4 h-fit `} data-testid={`order-card-${notif._id}`}>
                <div className="flex gap-2 h-full">
                  {!notif.isRead ? (
                    <BellRing className="w-9 h-9 text-[#09090B] rounded-full bg-[#E4E4E7] p-[10px]" data-testid={`notification-icon-ring-${notif._id}`} />
                  ) : (
                    <Bell className="w-9 h-9 text-[#09090B] rounded-full bg-[#E4E4E7] p-[10px]" data-testid={`notification-icon-${notif._id}`} />
                  )}

                  <div className="flex flex-col gap-2 h-full w-[218px]">
                    <div className="text-xs">
                      <span className="font-bold text-sm">#{notifs.length - index} </span>
                      <span className="text-[#3F4145] text-sm font-normal">{statusMessages[notif.status]}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <p className="py-[2px] rounded-full text-[12px] px-[10px] font-semibold border" data-testid={`status-label-${notif._id}`}>
                        {statusLabels[notif.status]}
                      </p>
                      <p className="text-[#3F4145] text-[11px]" data-testid={`order-date-${notif._id}`}>
                        {new Date(notif.createdAt)
                          .toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })
                          .replace(',', '')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSection;
