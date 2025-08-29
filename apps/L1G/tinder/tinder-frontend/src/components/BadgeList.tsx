'use client';

import * as React from 'react';
import { XCircle, XIcon, ChevronDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BadgeListProps {
  selectedValues: string[];
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  maxCount: number;
  clearExtraOptions: () => void;
  handleClear: () => void;
}

export const BadgeList = ({ selectedValues, options, maxCount, clearExtraOptions, handleClear }: BadgeListProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-wrap items-center">
        {selectedValues.slice(0, maxCount).map((value) => {
          const option = options.find((o) => o.value === value);
          const IconComponent = option?.icon;
          return (
            <Badge key={value} className="m-1 border-foreground/10 bg-card hover:bg-card/80" data-testid={`badge-${value}`}>
              {IconComponent && <IconComponent className="h-4 w-4 gap-1 text-foreground/10" />}
              <span className="text-foreground font-normal">{option?.label}</span>
            </Badge>
          );
        })}
        {selectedValues.length > maxCount && (
          <Badge className={'bg-transparent border-foreground/1 hover:bg-transparent text-foreground'}>
            <span className="font-normal">{`+ ${selectedValues.length - maxCount} more`}</span>
            <XCircle
              className="ml-2 h-4 w-4 cursor-pointer text-foreground"
              onClick={(event) => {
                event.stopPropagation();
                clearExtraOptions();
              }}
            />
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span
          onClick={(event) => {
            event.stopPropagation();
            handleClear();
          }}
          aria-label="Clear all"
          data-testid="clear-button"
        >
          <XIcon className="lucide lucide-x h-4 mx-2 cursor-pointer text-foreground" />
        </span>
        <Separator orientation="vertical" className="flex min-h-6 h-full" />
        <ChevronDown className="h-4 mx-2 cursor-pointer text-foreground" />
      </div>
    </div>
  );
};
