'use client';

import { Earlier } from './Earlier';
import { ThisWeek } from './ThisWeek';
import { Today } from './Today';
import { Yesterday } from './Yesterday';

type Props = {
  isOpen: boolean;
  setIsOpen: (_isOpen: boolean) => void;
};

export const NotificationSheet = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      <div
        className={`fixed top-0 left-[80px] w-[396px] h-full bg-white border-l shadow-xl transform transition-transform duration-500 ease-in-out z-40 rounded-r-xl border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="notification-sheet"
      >
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          <Today />
          <Yesterday />
          <ThisWeek />
          <Earlier />
        </div>
      </div>

      {isOpen && <div data-testid="open-sheet" className="fixed inset-0 bg-none w-[1200px] z-30" onClick={() => setIsOpen(false)} />}
    </>
  );
};
