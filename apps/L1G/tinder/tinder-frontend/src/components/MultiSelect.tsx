import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { BadgeList } from './BadgeList';
import OptionList from './OptionList';

const multiSelectVariants = cva('m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
}
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}
export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, variant: _variant = 'default', defaultValue = [], placeholder = 'Select options', maxCount = 3, modalPopover = false, className, ...props }, ref) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
      }
    };
    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option) ? selectedValues.filter((_value) => _value !== option) : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
    };
    const handleClear = () => {
      setSelectedValues([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
    };
    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        setSelectedValues([]);
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
      }
    };
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            data-testid="multi-select-trigger"
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={'flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto'}
          >
            {selectedValues.length > 0 ? (
              <BadgeList selectedValues={selectedValues} options={options} maxCount={maxCount} clearExtraOptions={clearExtraOptions} handleClear={handleClear} />
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">{placeholder}</span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <OptionList options={options} selectedValues={selectedValues} toggleOption={toggleOption} toggleAll={toggleAll} />
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {process.env.NODE_ENV === 'test' && (
                    <CommandItem className="flex-1 justify-center max-w-full">
                      <button type="button" onClick={clearExtraOptions} data-testid="trigger-clear-extra" className="w-full text-center cursor-pointer">
                        Trigger Clear Extra (Test Only)
                      </button>
                    </CommandItem>
                  )}
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem className="flex-1 justify-center max-w-full">
                        <button
                          type="button"
                          onClick={() => {
                            handleClear();
                          }}
                          data-testid="clear-extra-button"
                          aria-label="Clear all"
                          className="w-full text-center cursor-pointer"
                        >
                          Clear
                        </button>
                      </CommandItem>
                      <Separator orientation="vertical" className="flex min-h-6 h-full" />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => {
                      setIsPopoverOpen(false);
                    }}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
MultiSelect.displayName = 'MultiSelect';
