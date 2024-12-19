'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { IoIosInformationCircleOutline } from 'react-icons/io';

interface PaidLeaveProps {
  availablePaidDays: number;
  totalPaidLeaveDays: number; // Changed from '5' to 'number'
}

export const PaidLeave = ({ availablePaidDays, totalPaidLeaveDays }: PaidLeaveProps) => {
  return (
    <HoverCard>
      <HoverCardContent className="w-40 mb-2" align="center" side="top">
        <p className="text-sm">Ажилд орсноос хойш 1 жилийн хугацаанд {totalPaidLeaveDays} хоног цалинтай чөлөө авах боломжтой.</p>
      </HoverCardContent>
      <HoverCardTrigger asChild>
        <div className="w-[214.67px] h-[112px] bg-[#FFFFFF] flex flex-col border border-[#E4E4E7] rounded-xl pt-[18px] pl-6 pb-4">
          <div className="flex flex-row gap-[30px]">
            <div className="text-sm font-medium text-foreground">Цалинтай чөлөө</div>
            <IoIosInformationCircleOutline className="w-4 h-4 " />
          </div>

          <div className="text-xl font-semibold">{availablePaidDays} хоног</div>
          <div className="text-muted-foreground text-xs font-normal">боломжтой байна.</div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
