import { HeartOff } from 'lucide-react';

interface ContainerProps {
  heading?: string;
  subtext?: string;
  className?: string;
}
export const NoMatchesYet = ({ heading = 'No Matches Yet', subtext = 'Keep swiping, your next match could be just around the corner!', className = '' }: ContainerProps) => {
  {
    return (
      <div className={`py-8 min-h-screen flex items-center justify-center bg-background ${className}`}>
        <div className="max-w-md w-full text-center flex flex-col gap-4">
          <div className="relative flex items-center justify-center ">
            <HeartOff
              size={33}
              color="#09090B80"
              opacity={50}
              strokeWidth="2"
              className=" width-[33.33px] height-33.33px top-3.33px left-3.33px border/border-foreground-50 text-muted-foreground"
              data-testid="icon-no-matches"
            />
          </div>

          <div className="flex flex-col gap-1 w-fit">
            <p className="gap-4 text-sm font-medium  text-foreground tracking-tight text-nowrap" data-testid="text-heading">
              {heading}
            </p>

            <p className="w-fit text-sm font-extralight text-muted-foreground text-nowrap" data-testid="text-subtext">
              {subtext}
            </p>
          </div>
        </div>
      </div>
    );
  }
};
