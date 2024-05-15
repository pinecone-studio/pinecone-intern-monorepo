'use client';

import { CreateLeaveRequestModal } from './CreateLeaveRequest/CreateLeaveRequestModal';
import { HomePageHeader } from './HomePageHeader';

export const CreateLeaveRequestMain = () => {
  return (
    <div className="w-[100%] relative">
      <HomePageHeader />
      <CreateLeaveRequestModal />
    </div>
  );
};
