'use client';

import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useGetOrdersForUserQuery } from '@/generated';
import NotificationItem from './NotificationItem';

interface OrderType {
  _id: string;
  status: 'Pending' | 'InProcess' | 'Ready' | 'Done';
  createdAt: Date;
}

const NotificationSection = () => {
  const [notifs, setNotifs] = useState<OrderType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [unreadOrders, setUnreadOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser._id);
      }
    } catch (error) {
      toast.error('Та нэвтэрч орно уу!');
    }
  }, [userId]);

  const { data } = useGetOrdersForUserQuery({
    variables: { userId: userId || '' },
    skip: !userId,
    pollInterval: 5000,
  });

  useEffect(() => {
    if (data?.getOrdersForUser) {
      const sortedOrders = data.getOrdersForUser.filter((order): order is OrderType => order !== null).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setNotifs(sortedOrders);

      const newUnreadOrders = new Set(sortedOrders.map((order) => order._id));
      setUnreadOrders(newUnreadOrders);
    }
  }, [data]);

  // const markAsRead = (orderId: string) => {
  //   setUnreadOrders((prev) => {
  //     const updated = new Set(prev);
  //     updated.delete(orderId);
  //     return updated;
  //   });
  // };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" aria-label="Мэдэгдлүүд">
          <Bell width={16} className="text-gray-700 hover:text-black transition" />
          {unreadOrders.size > 0 && <span className="absolute top-0 left-6 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">{unreadOrders.size}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-2 w-11/12 overflow-scroll">
        <SheetHeader className="flex justify-start items-center p-4">
          <h2 className="text-lg font-bold">Мэдэгдлүүд</h2>
        </SheetHeader>

        <div className="flex flex-col space-y-3 px-2">
          {notifs.map((notif, index) => (
            <NotificationItem
              key={notif._id}
              orderId={notif._id}
              status={notif.status}
              createdAt={notif.createdAt}
              index={index}
              totalOrders={notifs.length}
              isUnread={unreadOrders.has(notif._id)}
              // onClick={() => markAsRead(notif._id)}
              data-testid={`order${index}`}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSection;
