'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useGetEmployeeByIdQuery } from '@/generated';

import { IoIosInformationCircleOutline } from 'react-icons/io';

interface RemoteHoverCardProps {
  availableDays: number;
  totalRemoteDays: number;
}

export const RemoteWork = ({ totalRemoteDays }: RemoteHoverCardProps) => {
  const { data, loading } = useGetEmployeeByIdQuery({ variables: { getEmployeeByIdId: '676e6e4007d5ae05a35cda9e' } });

  if (loading) {
    return <div>Loading...</div>;
  }

  const availableDays = data?.getEmployeeById?.remoteLimit;

  return (
    <HoverCard>
      <HoverCardContent className="w-40 mb-2" align="center" side="top">
        <p className="text-sm">Сард нийт {totalRemoteDays} хоног зайнаас ажиллах боломжтой.</p>
      </HoverCardContent>
      <HoverCardTrigger asChild>
        <div>
          <div className="w-[214.67px] h-[112px] bg-[#FFFFFF] flex flex-col border border-[#E4E4E7] rounded-xl pt-[18px] pl-6 pb-4">
            <div className="flex flex-row gap-[30px]">
              <div className=" text-sm font-medium text-foreground">Зайнаас ажиллах</div>
              <IoIosInformationCircleOutline className="w-4 h-4" />
            </div>

            <div className={`text-xl font-semibold ${availableDays === 0 ? 'text-red-500' : 'text-green-500'}`}>{availableDays} хоног</div>
            <div className="text-muted-foreground text-xs font-normal">боломжтой байна.</div>
          </div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
