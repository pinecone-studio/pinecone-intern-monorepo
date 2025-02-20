import { formatDistanceToNowStrict } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
export const PostDate = ({ date, textColor = 'bg-gray-600' }: { date: number; textColor?: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center font-normal  text-sm hover:cursor-pointer">{formatDistanceToNowStrict(new Date(date))}</span>
        </TooltipTrigger>
        <TooltipContent>
          <span className={`flex items-center font-normal  text-sm ${textColor}`}>{new Date(date).toDateString()}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
