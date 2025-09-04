'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';

import { CommandGroup, CommandItem } from '@/components/ui/command';
import { CommandList } from 'cmdk';

export interface OptionListProps {
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  selectedValues: string[];
  toggleOption: (_value: string) => void;
  // Remove toggleAll since we're not using it anymore
}

const OptionList = ({ options, selectedValues, toggleOption }: OptionListProps) => {
  return (
    <CommandList>
      <CommandGroup>
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
              <div className={'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ' + (isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible')}>
                <CheckIcon data-testid="check-icon" className="h-4 w-4" />
              </div>
              {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
              <span>{option.label}</span>
            </CommandItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  );
};

export default OptionList;