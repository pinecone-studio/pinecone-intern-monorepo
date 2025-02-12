'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationType } from '@/generated';
import Link from 'next/link';

type Props = {
  reqNotification?: NotificationType[];
};

export const RequestFollow = ({ reqNotification }: Props) => {
  return (
    <div>
      {reqNotification?.map((n) => (
        <div key={n.id} className="flex items-center mt-4 h-[60px] py-2 px-6 mb-2">
          <Avatar>
            <AvatarImage src={n?.user?.profileImage} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className=" ml-[14px] text-sm break-words mr-2 ">
            <Link className="font-bold mr-1  text-base " href={'/'}>
              {'name'}
            </Link>
            requested to follow you
          </div>
          {<button className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">Follow</button>}
          {n.request === 'PENDING' && (
            <div className="flex gap-2">
              <button className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">Confirm</button>
              <button className="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
