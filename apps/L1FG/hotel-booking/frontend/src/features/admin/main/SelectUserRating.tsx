'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '../../../../../../../../libs/shadcn/src/lib/utils';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DownArrow } from '../../../components/admin/svg';

const frameworks = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: '+9 Excellent',
    label: '+9 Excellent',
  },
  {
    value: '+8 Very Good',
    label: '+8 Very Good',
  },
  {
    value: '+7 Good',
    label: '+7 Good',
  },
];

export const SelectUserRating = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open ? 'true' : 'false'}
          className="px-3 py-2 flex items-center justify-between bg-white border border-[#E4E4E7] rounded-[6px] max-w-[156px] w-full text-[#09090B] font-Inter text-sm font-normal"
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'User Rating'}
          <DownArrow />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[232px] p-0 ">
        <Command>
          <CommandList>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className="text-[#09090B] font-Inter text-sm font-normal"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check className={cn('ml-auto w-4 h-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
