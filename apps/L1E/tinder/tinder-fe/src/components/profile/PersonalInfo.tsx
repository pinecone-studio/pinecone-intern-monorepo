import React from 'react';
import { Input } from '@/components/ui/input';

type PersonalInfoProps = {
  user: {
    username: string;
    email: string;
  } | null;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-gray-200 pt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input className="h-36px" data-testid="name" value={user?.username} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input className="h-36px" data-testid="email" value={user?.email} />
      </div>
    </div>
  );
};

export default PersonalInfo;
