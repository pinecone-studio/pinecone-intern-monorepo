import { formatDistanceToNowStrict } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
export const PostDate = ({ date }: { date: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="flex items-center font-normal text-gray-600 text-sm hover:cursor-pointer">{formatDistanceToNowStrict(new Date(date))}</span>
        </TooltipTrigger>
        <TooltipContent>
          <span className="flex items-center font-normal text-gray-600 text-sm">{new Date(date).toDateString()}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
