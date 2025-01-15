'use client';

import LeftSideBar from './LeftSideBar';
import ImagesSection from './ImagesSection';
import { useEffect, useState } from 'react';
import { ProfileSection } from './Profile';

type User = {
  username: string;
  email: string;
};

const ProfilePage = () => {
  const [step, setStep] = useState<'profile' | 'images'>('profile');
  const [userData, setUserData] = useState<User | null>(null);

  const handleSetStep = (value: 'profile' | 'images') => {
    setStep(value);
  };

  const getUserDataFromLocalStorage = (): User | null => {
    const storedData = localStorage.getItem('user');
    if (!storedData) return null;

    return JSON.parse(storedData) as User;
  };

  useEffect(() => {
    const user = getUserDataFromLocalStorage();
    if (user) {
      setUserData(user);
    } else {
      console.error('Хэрэглэгчийн өгөгдөл олдсонгүй.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center lg:text-left">
          <h1 data-testid="username" className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Hi, {userData?.username || 'Guest'}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">{userData?.email || 'No email available'}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-5 border-t border-gray-200">
          <div className="col-span-1 lg:col-span-1">
            <LeftSideBar data-testid="setstep" setStep={handleSetStep} />
          </div>
          <div className="col-span-1 lg:col-span-2">{step === 'profile' ? <ProfileSection /> : <ImagesSection />}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
