'use client';
import Image from 'next/image';
import { FC } from 'react';

interface AdminHeaderProps {
  activeTab: 'ticket' | 'cancelRequest';
  setActiveTab: (_tab: 'ticket' | 'cancelRequest') => void;
}

export const AdminHeader: FC<AdminHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="w-full mt-4 px-6 bg-white">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://media.gettyimages.com/id/156303396/nl/foto/nerd-student-making-a-funny-smiling-face.jpg?s=2048x2048&w=gi&k=20&c=1cNfJMBwkqDDzcFcdbGW6AYg0waGFQLpFNHD2jDIm4w="
            alt="img"
            width={100}
            height={100}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-lg font-semibold">TICKET BOOKING</h1>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('ticket')} className={`px-3 py-1 ${activeTab === 'ticket' ? 'border-b border-black' : ''}`}>
            Тасалбар
          </button>
          <button onClick={() => setActiveTab('cancelRequest')} className={`px-3 py-1 ${activeTab === 'cancelRequest' ? 'border-b border-black' : ''}`}>
            Цуцлах хүсэлт
          </button>
        </div>
      </div>
    </header>
  );
};
