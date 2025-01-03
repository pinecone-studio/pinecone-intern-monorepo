'use client';

import { useGetEmployeeByIdQuery } from '@/generated';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
interface LeaveProps {
  totalFreeTime: number;
}

export const Leave = ({ totalFreeTime }: LeaveProps) => {
  const { data, loading } = useGetEmployeeByIdQuery({ variables: { getEmployeeByIdId: '676e6e4007d5ae05a35cda9e' } });

  if (loading) {
    return <div>Loading...</div>;
  }

  const timeleave = data?.getEmployeeById?.freeLimit;

  return (
    <HoverCard>
      <HoverCardContent className="w-40 mb-2" align="center" side="top">
        <p className="text-sm">Сард нийт {totalFreeTime} цаг чөлөө авах боломжтой.</p>
      </HoverCardContent>
      <HoverCardTrigger asChild>
        <div>
          <div className="w-[214.67px] h-[112px] bg-[#FFFFFF] flex flex-col border border-[#E4E4E7] rounded-xl pt-[18px] pl-6 pb-4">
            <div className="flex flex-row gap-[30px]">
              <div className="text-sm font-medium text-foreground">Чөлөө</div>
            </div>

            <div className={`text-xl font-semibold ${timeleave === 0 ? 'text-red-500' : 'text-green-500'}`}>{timeleave} цагийн</div>
            <div className="text-muted-foreground text-xs font-normal">чөлөө авсан байна.</div>
          </div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
