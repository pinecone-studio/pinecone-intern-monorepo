'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Bell, BellRing } from 'lucide-react';

interface NotificationItemProps {
  orderId: string;
  status: 'Pending' | 'InProcess' | 'Ready' | 'Done';
  createdAt: Date;
  index: number;
  totalOrders: number;
  isUnread: boolean;
  // onClick: () => void;
}

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

const NotificationItem = ({
  orderId,
  status,
  createdAt,
  index,
  totalOrders,
  isUnread,
}: // onClick
NotificationItemProps) => {
  return (
    <Card
      key={orderId}
      className="w-full cursor-pointer"
      //  onClick={onClick}
    >
      <CardContent className="flex justify-between items-center p-4 h-fit">
        <div className="flex gap-2 h-full">
          {isUnread ? (
            <BellRing className="w-9 h-9 text-[#09090B] rounded-full bg-[#E4E4E7] p-[10px]" data-testid="notification-icon-ring" />
          ) : (
            <Bell className="w-9 h-9 text-[#09090B] rounded-full bg-[#E4E4E7] p-[10px]" data-testid="notification-icon" />
          )}

          <div className="flex flex-col gap-2 h-full w-[218px]">
            <div className="text-xs">
              <span className="font-bold text-sm ">#{totalOrders - index} </span>
              <span className="text-[#3F4145] text-sm font-normal">{statusMessages[status]}</span>
            </div>
            <div className="flex justify-between items-center gap-4">
              <p className="py-[2px] rounded-full text-[12px] px-[10px] font-semibold border">{statusLabels[status]}</p>
              <p className="text-[#3F4145] text-[11px]">
                {new Date(createdAt)
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
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
