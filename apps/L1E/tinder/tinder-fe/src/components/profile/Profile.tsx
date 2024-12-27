'use client';
import { useEffect, useState } from 'react';
import { useGetUserByIdQuery } from '@/generated';
import PersonalInfo from './PersonalInfo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Bio from './Bio';
import GenderPreference from './GenderPreference';
import Interests from './Interests';

type User = {
  _id: string;
  username: string;
  email: string;
  interest: string;
  password: string;
  hobby?: string | null;
  bio: string;
  profession: string;
  job: string;
  age: string;
  createdAt: string;
  updatedAt: string;
};

export const ProfileSection = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { data } = useGetUserByIdQuery({
    variables: { userId: '676e56bf1fd44463e5e2c322' },
  });

  useEffect(() => {
    setUserData(data?.getUserById ?? null);
  }, [data]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Personal Information</h2>
        <p className="text-sm font-normal text-gray-500">This is how others will see you on the site.</p>
      </div>

      <PersonalInfo data-testid="personal" user={userData} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <Input data-testid="age" value={userData?.age || ''} className="text-sm text-gray-500" />
      </div>

      <GenderPreference data-testid="gender" />
      <Bio user={userData} />
      <Interests />
      <div className="space-y-2">
        <label className="text-sm font-medium">Profession</label>
        <Input data-testid="profession" value={userData?.profession || ''} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">School/Work</label>
        <Input data-testid="work" value={userData?.job || ''} />
      </div>

      <Button className="bg-[#E11D48]">Update profile</Button>
    </div>
  );
};
