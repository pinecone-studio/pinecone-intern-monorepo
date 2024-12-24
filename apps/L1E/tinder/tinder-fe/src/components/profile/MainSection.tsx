'use client';
import LeftSideBar from './LeftSideBar';
import { ProfileSection } from './Profile';
import ImagesSection from './ImagesSection';
import { useState } from 'react';

const ProfilePage = () => {
  const [step, setStep] = useState<'profile' | 'images'>('profile');

  const handleSetStep = (value: 'profile' | 'images') => {
    setStep(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 text-center lg:text-left">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">Hi, Shagai</h1>
          <p className="text-gray-500 text-sm sm:text-base">n.shagai@pinecone.mn</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pt-5 border-t border-gray-200">
          <div className="col-span-1 lg:col-span-1">
            <LeftSideBar setStep={handleSetStep} />
          </div>
          <div className="col-span-1 lg:col-span-2">{step === 'profile' ? <ProfileSection /> : <ImagesSection />}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
