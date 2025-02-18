import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Remove = ({ removeStyle, onclick }: { onclick: () => void; removeStyle?: string }) => {
  return (
    <button className={cn(``, removeStyle)} data-testid="friendship-status-following" onClick={onclick}>
      Remove
    </button>
  );
};
