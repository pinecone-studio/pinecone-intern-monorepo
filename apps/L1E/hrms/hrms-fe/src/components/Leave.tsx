'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
interface LeaveProps {
  timeleave: number | undefined;
}

export const Leave = ({ timeleave }: LeaveProps) => {
  return (
    <HoverCard>
      <HoverCardContent className="w-40 mb-2" align="center" side="top">
        <p className="text-sm">Сард нийт 10 цаг чөлөө авах боломжтой.</p>
      </HoverCardContent>
      <HoverCardTrigger asChild>
        <div>
          <div className="w-[214.67px] h-[112px] bg-[#FFFFFF] flex flex-col border border-[#E4E4E7] rounded-xl pt-[18px] pl-6 pb-4">
            <div className="flex flex-row gap-[30px]">
              <div className="text-sm font-medium text-foreground">Чөлөө</div>
            </div>

            <div className="text-xl font-semibold">{timeleave} цагийн</div>
            <div className="text-muted-foreground text-xs font-normal">чөлөө авсан байна.</div>
          </div>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};
