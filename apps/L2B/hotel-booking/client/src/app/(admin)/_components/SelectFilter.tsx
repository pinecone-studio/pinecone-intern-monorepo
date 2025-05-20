import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  placeholder: string;
  items: {
    item: string;
    value: string;
  }[];
};

export const SelectFilter = ({ items, placeholder }: Props) => {
  return (
    <Select>
      <SelectTrigger data-testid={`select-trigger-${placeholder?.toLowerCase()}`} className="w-[210px] focus-visible:ring-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map(({ item, value }) => (
            <SelectItem data-testid={`select-item-${value}`} className="focus-visible:ring-0" key={value} value={value}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
