/* eslint-disable complexity */
'use client';
import React, { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Gender, useUpdateInfoMutation, useUpdateProfileImageMutation } from '@/generated';
import { UploadSection } from '@/features/settings/UpdateProfile';
import { useAuth } from '@/components/providers/AuthProvider';

// eslint-disable-next-line react/function-component-definition
export default function Page() {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [buttonText] = useState('Change profile photo');
  const { user } = useAuth();
  const [updatePhoto, { data, loading }] = useUpdateProfileImageMutation();

  const [updateInfo, { error }] = useUpdateInfoMutation();

  const handleSubmit = async () => {
    try {
      let genderCorrect;
      switch (gender) {
        case Gender.Female: {
          genderCorrect = Gender.Female;
          break;
        }
        case Gender.Male: {
          genderCorrect = Gender.Male;
          break;
        }
        default: {
          genderCorrect = Gender.NotKnow;
        }
      }
      await updateInfo({
        variables: {
          input: {
            userName,
            fullName,
            bio,
            gender: genderCorrect,
          },
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="w-[600px] h-[800px] flex flex-col justify-between">
        <p className="font-sans text-[30px] font-semibold leading-[36px] tracking-tightest text-text-foreground" data-testid="edit-profile">
          Edit Profile
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {data?.updateProfileImage ? (
                <div style={{ backgroundImage: `url(${data?.updateProfileImage})`, backgroundPosition: 'center' }} className="w-10 h-10 rounded-full bg-black bg-cover">
                  {loading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">🔄</div>}
                </div>
              ) : (
                <div style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center' }} className="w-10 h-10 rounded-full bg-black bg-cover"></div>
              )}
              <p>{fullName || 'Your Name'}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-[#0095F6] hover:text-blue-700 border-[#71717A]" variant="outline">
                  {buttonText}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <UploadSection updatePhoto={updatePhoto} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Full Name</p>
            <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Username</p>
            <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter username" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Bio</p>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter bio" className="w-[600px] h-[132px]" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-roboto text-[16px] font-semibold leading-[18px] text-customBlack">Gender</p>
            <div className="w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild data-cy="DropdownMenuTrigger-Gender">
                  <Button variant="outline" className="w-full text-left">
                    {gender || 'Select Gender'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[var(--radix-popper-anchor-width)] w-full">
                  <DropdownMenuItem data-cy="dropdown-select-female" onSelect={() => setGender(`${Gender.Female}`)}>
                    Female
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setGender(`${Gender.Male}`)}>Male</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setGender(`${Gender.NotKnow}`)}>Prefer not to say</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button data-cy="save-button" onClick={handleSubmit} disabled={loading} className="w-[80px] h-[36px] bg-[#0095F6] hover:bg-[#2563EB]">
            {loading ? 'Saving...' : 'Submit'}
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm text-center mt-2">Failed to update profile. Please try again.</p>}

        <div className="text-gray-500 text-center text-[12px] flex flex-col gap-4 mt-8">
          <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p>© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
}
