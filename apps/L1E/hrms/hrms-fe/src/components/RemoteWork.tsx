'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { IoIosInformationCircleOutline } from 'react-icons/io';

interface RemoteHoverCardProps {
  availableDays: number;
  totalRemoteDays: 5;
}

export const RemoteWork = ({ availableDays, totalRemoteDays }: RemoteHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardContent className="w-40 mb-2" align="center" side="top">
        <p className="text-sm">Сард нийт {totalRemoteDays} хоног зайнаас ажиллах боломжтой.</p>
      </HoverCardContent>
      <HoverCardTrigger asChild>
        <div>
          <div className="w-[214.67px] h-[112px] bg-[#FFFFFF] flex flex-col border border-[#E4E4E7] rounded-xl pt-[18px] pl-6 pb-4">
            <div className="flex flex-row gap-[30px]">
              <div className="text-sm font-medium text-foreground">Зайнаас ажиллах</div>
              <IoIosInformationCircleOutline className="w-4 h-4" />
            </div>

              <div className="text-xl font-semibold">{availableDays} хоног</div>
            <div className="text-muted-foreground text-xs font-normal">боломжтой байна.</div>
          </div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
