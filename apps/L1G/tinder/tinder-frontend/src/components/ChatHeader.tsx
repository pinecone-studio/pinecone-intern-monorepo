'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Video, Shield, Flag } from 'lucide-react';
import type { ChatUser } from 'types/chat';
import ViewProfile from './ViewProfile';
import UnmatchButton from './UnmatchButton';

interface ChatHeaderProps {
  user: ChatUser;
  matchId?: string;
  onUnmatched?: () => void;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, matchId, onUnmatched, onBack }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRefDesktop = useRef<HTMLDivElement>(null);
  const dropdownRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      const isInsideDialog = target.closest('[role="dialog"]') || target.closest('[data-radix-dialog-content]');
      const isInsideDropdown = dropdownRefDesktop.current?.contains(target) || dropdownRefMobile.current?.contains(target);

      if (!isInsideDropdown && !isInsideDialog) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBlock = () => {
    setShowDropdown(false);
    console.log('Block user clicked');
  };

  const handleReport = () => {
    setShowDropdown(false);
    console.log('Report user clicked');
  };
  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:flex items-center mt-2 p-4 bg-white">
        <div className="flex items-center gap-3 flex-1">
          <img src={user.images?.[0] || '/placeholder.svg'} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">Active recently</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video size={20} className="text-gray-600" />
          </button>

          <div className="relative" ref={dropdownRefDesktop}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="py-2">
                  <ViewProfile user={user} />
                  <button onClick={handleBlock} className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Shield size={18} className="text-orange-500" />
                    <span className="font-medium">Block User</span>
                  </button>

                  <button onClick={handleReport} className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Flag size={18} className="text-red-500" />
                    <span className="font-medium">Report User</span>
                  </button>

                  {matchId && (
                    <>
                      <UnmatchButton matchId={matchId} onUnmatched={onUnmatched} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Header */}

      <div className="md:hidden flex justify-between mt-2 items-center p-4 bg-white">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
          )}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
          <img src={user.images?.[0] || '/placeholder.svg'} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <h3 className="font-semibold text-gray-900 text-sm">{user.name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Video size={20} className="text-blue-500" />
          </button>

          <div className="relative" ref={dropdownRefMobile}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <MoreHorizontal size={20} className="text-gray-600" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="py-2">
                  <ViewProfile user={user} />
                  <button onClick={handleBlock} className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Shield size={18} className="text-orange-500" />
                    <span className="font-medium">Block User</span>
                  </button>

                  <button onClick={handleReport} className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Flag size={18} className="text-red-500" />
                    <span className="font-medium">Report User</span>
                  </button>

                  {matchId && (
                    <>
                      <UnmatchButton matchId={matchId} onUnmatched={onUnmatched} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
