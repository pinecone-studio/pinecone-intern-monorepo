'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';

const interests = [
  'Art',
  'Music',
  'Investment',
  'Technology',
  'Design',
  'Education',
  'Health',
  'Fashion',
  'Travel',
  'Food',
  'Sports',
  'Gaming',
  'Fitness',
  'Photography',
  'Writing',
  'Cooking',
  'Nature',
  'Volunteering',
  'Science',
  'History',
];

type UserData = {
  name: string;
  email: string;
  gender: string;
  dob: string;
  bio: string;
  interestOptions: string[];
  profession: string;
  schoolOrWork: string;
};

type ProfileInterestProps = {
  editUserdata: UserData;
  setEditUserdata: React.Dispatch<React.SetStateAction<UserData>>;
};

export const ProfileInterest = ({ editUserdata, setEditUserdata }: ProfileInterestProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([...editUserdata.interestOptions]);
  const maxInterests = 10;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => {
      let updated: string[];
      if (prev.includes(interest)) {
        updated = prev.filter((item) => item !== interest);
      } else {
        updated = [...prev, interest];
      }
      setEditUserdata((user) => ({
        ...user,
        interestOptions: updated,
      }));

      return updated;
    });
  };

  return (
    <div className="space-y-2">
      <Label>Interest</Label>
      <div className="border rounded-md p-3">
        <div className="flex flex-wrap gap-3">
          {interests.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            const isDisabled = !isSelected && selectedInterests.length >= maxInterests;

            return (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                disabled={isDisabled}
                className={`
                  px-3 py-1 rounded-lg border transition-all duration-200
                  ${isSelected ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3">You can select up to a maximum of 10 interests.</p>
    </div>
  );
};
