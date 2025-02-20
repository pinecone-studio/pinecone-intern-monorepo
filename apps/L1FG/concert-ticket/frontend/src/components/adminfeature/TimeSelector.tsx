import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TimeSelectorProps {
  value: string;
  onChange: (_newTime: string) => void;
}

export const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  const [hours, minutes] = value ? value.split(':') : ['00', '00'];

  const handleHourChange = (newHour: string) => {
    const newTime = `${newHour}:${minutes}`;
    onChange(newTime);
  };

  const handleMinuteChange = (newMinute: string) => {
    const newTime = `${hours}:${newMinute}`;
    onChange(newTime);
  };

  return (
    <div>
      <Label htmlFor="concertTime" className="text-right">
        Тоглолтын цаг сонгох
      </Label>
      <div className="flex gap-2">
        <Select value={hours} onValueChange={handleHourChange}>
          <SelectTrigger role="option" className="w-[100px]">
            <SelectValue placeholder="Цаг" />
          </SelectTrigger>
          <SelectContent role="option">
            {Array.from({ length: 24 }, (_, i) => (
              <SelectItem key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={minutes} onValueChange={handleMinuteChange}>
          <SelectTrigger role="option" className="w-[100px]">
            <SelectValue placeholder="Минут" />
          </SelectTrigger>
          <SelectContent role="option">
            {Array.from({ length: 60 }, (_, i) => (
              <SelectItem key={i} value={String(i).padStart(2, '0')}>
                {String(i).padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
