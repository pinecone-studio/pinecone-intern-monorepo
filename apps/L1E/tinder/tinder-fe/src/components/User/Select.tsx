import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SelectDemo = () => {
  return (
    <Select>
      <SelectTrigger className="w-[400px] h-10">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="pineapple">Both</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
