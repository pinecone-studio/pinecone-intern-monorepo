import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

type DialogItemPropsType = {
  htmlFor: string;
  children: ReactNode;
  name?: string;
  withLabel?: boolean;
};

export const DialogItem = ({ htmlFor, children, name, withLabel = true }: DialogItemPropsType) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label htmlFor={htmlFor} className="text-[#09090B]" datatest-id="dialog-item-name">
        {withLabel && name}
        <span className="text-[#E11D48]">*</span>
      </Label>
      {children}
    </div>
  );
};
