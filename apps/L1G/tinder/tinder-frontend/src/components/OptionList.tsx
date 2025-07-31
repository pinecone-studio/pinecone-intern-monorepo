'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';

import { cn } from '../../../../../../libs/shadcn/src/lib/utils';
import { CommandGroup, CommandItem } from '@/components/ui/command';

interface OptionListProps {
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  selectedValues: string[];
  toggleOption: (_value: string) => void;
  toggleAll: () => void;
}

const OptionList = ({ options, selectedValues, toggleOption, toggleAll }: OptionListProps) => {
  return (
    <CommandGroup>
      <CommandItem
        key="all"
        onSelect={() => {
          toggleAll();
        }}
        className="cursor-pointer"
      >
        <div
          className={cn(
            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
            selectedValues.length === options.length ? 'bg-primary text-primaxry-foreground' : 'opacity-50 [&_svg]:invisible'
          )}
        >
          <CheckIcon className="h-4 w-4" />
        </div>
        <span>(Select All)</span>
      </CommandItem>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <CommandItem
            key={option.value}
            onSelect={() => {
              toggleOption(option.value);
            }}
            className="cursor-pointer"
          >
            <div className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible')}>
              <CheckIcon className="h-4 w-4" />
            </div>
            {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{option.label}</span>
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
};

export default OptionList;
