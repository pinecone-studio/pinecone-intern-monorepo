import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Requested = ({ requestedStyle }: { requestedStyle?: string }) => {
  return (
    <button className={cn(``, requestedStyle)} data-testid="friendship-status-request">
      Requested
    </button>
  );
};
