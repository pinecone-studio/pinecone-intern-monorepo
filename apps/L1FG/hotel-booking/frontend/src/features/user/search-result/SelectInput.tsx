import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectInputProps {
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
}

export const SelectInput = ({ setSearchValuePrice }: SelectInputProps) => {
  return (
    <Select
      onValueChange={(value) => {
        if (value === 'lowtohigh' || value === 'hightolow') {
          const order = value === 'lowtohigh' ? 'asc' : 'desc';
          setSearchValuePrice(order);
        }
      }}
      data-testid="select"
    >
      <SelectTrigger data-testid="select-trigger">
        <SelectValue placeholder="Recommended" data-testid="select-placeholder" />
      </SelectTrigger>
      <SelectContent data-testid="select-content">
        <SelectItem value="recommended" data-testid="select-item-recommended">
          Recommended
        </SelectItem>
        <SelectItem value="lowtohigh" data-testid="select-item-lowtohigh">
          Price: Low to High
        </SelectItem>
        <SelectItem value="hightolow" data-testid="select-item-hightolow">
          Price: High to Low
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
