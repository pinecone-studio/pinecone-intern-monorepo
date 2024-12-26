'use client';
import { Textarea } from '@/components/ui/textarea';

type PersonalInfoProps = {
  user: {
    bio: string;
  } | null;
};

const Bio: React.FC<PersonalInfoProps> = ({ user }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Bio</label>
      <Textarea value={user?.bio} />
    </div>
  );
};

export default Bio;
