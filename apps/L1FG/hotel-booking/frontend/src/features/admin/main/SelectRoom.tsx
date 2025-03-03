'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DownArrow } from '@/components/admin/svg';

const frameworks = [
  {
    value: 'All Room',
    label: 'All Room',
  },
  {
    value: '1 Bed',
    label: '1 Bed',
  },
  {
    value: '2 Bed',
    label: '2 Bed',
  },
  {
    value: '3 Bed',
    label: '3 Bed',
  },
];

export const SelectRoom = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="button"
          aria-expanded={open ? 'true' : 'false'}
          className="px-3 py-2 flex items-center justify-between bg-white border border-[#E4E4E7] rounded-[6px] max-w-[156px] w-full text-[#09090B] font-Inter text-sm font-normal"
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'Rooms'}
          <DownArrow />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[232px] p-0 ">
        <Command>
          <CommandInput placeholder="Search option ..." className="h-9" />
          <CommandList>
            <CommandEmpty>No room found.</CommandEmpty>
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
