'use client';

import * as React from 'react';
import { Check } from 'lucide-react';

import { cn } from '../../../../../../../../libs/shadcn/src/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DownArrow } from '../../../components/admin/svg';

const frameworks = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Ulaanbaatar',
    label: 'Ulaanbaatar',
  },
  {
    value: 'Darkhan',
    label: 'Darkhan',
  },
  {
    value: 'Erdenet',
    label: 'Erdenet',
  },
  {
    value: 'Omnogobi',
    label: 'Omnogobi',
  },
  {
    value: 'Govi-Altai',
    label: 'Govi-Altai',
  },
];

export const SelectLocation = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          data-testid="select-location-trigger"
          className="px-3 py-2 flex items-center justify-between bg-white border border-[#E4E4E7] rounded-[6px] max-w-[156px] w-full text-[#09090B] font-Inter text-sm font-normal"
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : 'Location'}
          <DownArrow />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[232px] p-0 " data-testid="select-location-content">
        <Command>
          <CommandInput placeholder="Search option ..." className="h-9" data-testid="select-location-input" />
          <CommandList>
            <CommandEmpty data-testid="select-location-empty">No location found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  data-testid={`select-location-item-${framework.value}`}
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
