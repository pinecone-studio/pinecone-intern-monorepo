'use client';
import { Textarea } from '@/components/ui/textarea';

export const Bio = () => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Bio</label>
      <Textarea placeholder="Tell us about yourself" defaultValue="" />
    </div>
  );
};
