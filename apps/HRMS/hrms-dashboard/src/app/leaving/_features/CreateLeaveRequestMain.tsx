'use client';

import { HomePageHeader } from './HomePageHeader';
import { CreateLeaveRequestModal } from './CreateLeaveRequestSteps/CreateLeaveRequestModal';

export const CreateLeaveRequestMain = () => {
  return (
    <div className="w-[100%] relative">
      <HomePageHeader />
      <CreateLeaveRequestModal />
    </div>
  );
};
