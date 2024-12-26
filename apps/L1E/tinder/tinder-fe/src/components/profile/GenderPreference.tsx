'use client';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

const GenderPreference = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Gender Preferences:</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Male" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GenderPreference;
