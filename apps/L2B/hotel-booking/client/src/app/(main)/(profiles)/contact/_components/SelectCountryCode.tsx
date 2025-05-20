import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SelectCountryCode = () => {
  return (
    <Select>
      <SelectTrigger data-testid="select" className="w-[88px] focus-visible:ring-transparent">
        <SelectValue placeholder="+976" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mn">+976</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
