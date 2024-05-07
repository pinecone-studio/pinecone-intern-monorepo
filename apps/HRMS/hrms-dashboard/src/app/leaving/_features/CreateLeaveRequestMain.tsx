'use client';

import { CreateLeaveRequestModal } from '../_components';
import { HomePageHeader } from '../_components/HomePageHeader';

export const CreateLeaveRequestMain = () => {
  return (
    <div className="w-[100%] relative">
      <HomePageHeader />
      <CreateLeaveRequestModal />
    </div>
  );
};
