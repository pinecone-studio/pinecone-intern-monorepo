import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectDemoProps {
  selectedInterest: string;
  setSelectedInterest: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectDemo: React.FC<SelectDemoProps> = ({ selectedInterest, setSelectedInterest }) => {
  const handleChange = (value: string) => {
    setSelectedInterest(value);
  };

  return (
    <Select data-testid="select" value={selectedInterest} onValueChange={handleChange}>
      <SelectTrigger data-testid="trigger" className="w-[400px] h-10">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem data-testid="male" value="male">
            Male
          </SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
