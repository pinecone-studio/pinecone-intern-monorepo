'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface NotificationProps {
  id: number;
  message: string;
  status: 'pending' | 'preparing' | 'completed' | 'delivered';
  time: string;
}

const statusStyles = {
  pending: 'bg-yellow-500 text-white',
  preparing: 'bg-blue-500 text-white',
  completed: 'bg-green-500 text-white',
  delivered: 'bg-gray-500 text-white',
};

const notifications: NotificationProps[] = [
  { id: 1, message: 'Захиалга баталгаажлаа', status: 'pending', time: '24.10.19 15:25' },
  { id: 2, message: 'Захиалга бэлтгэгдэж байна', status: 'preparing', time: '24.10.19 13:27' },
  { id: 3, message: 'Захиалга бэлтгэгдэж байна', status: 'delivered', time: '24.10.19 13:27' },
  { id: 4, message: 'Захиалга бэлтгэгдэж байна', status: 'completed', time: '24.10.19 13:27' },
];

const NotificationSection = () => {
  const [notifs] = useState(notifications);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative" aria-label="Мэдэгдлүүд">
          <Bell width={16} className="text-gray-700 hover:text-black transition" />
          {notifs.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">{notifs.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="px-2 w-5/6">
        <SheetHeader className="flex justify-start items-center p-4">
          <h2 className="text-lg font-bold">Мэдэгдлүүд</h2>
        </SheetHeader>

        <div className="flex flex-col space-y-3 px-2">
          {notifs.map((notif) => (
            <Card key={notif.id} className="shadow-md w-full">
              <CardContent className="flex justify-between items-center p-4 h-[93px]">
                <div className="flex items-center space-x-3 h-full">
                  <Bell className="w-7 h-7 text-gray-500 rounded-full bg-gray-200 p-1" aria-hidden="true" />
                  <div className="flex flex-col gap-2 h-full justify-center">
                    <div className="text-[13px] flex gap-2">
                      <p className="font-medium">#{notif.id}</p>
                      <p className="text-gray-400">{notif.message}</p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <p className={`py-1 rounded-full text-[10px] p-2 font-semibold ${statusStyles[notif.status]}`}>
                        {notif.status === 'pending' && 'Хүлээгдэж буй'}
                        {notif.status === 'preparing' && 'Бэлтгэгдэж буй'}
                        {notif.status === 'completed' && 'Дууссан'}
                        {notif.status === 'delivered' && 'Хүргэгдсэн'}
                      </p>
                      <p className="text-gray-500 text-[10px]">{notif.time}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSection;
