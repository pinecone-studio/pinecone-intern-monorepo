'use client';

import { HistoryBox } from './_features';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <div data-testid="profile-main">
      <HistoryBox />
    </div>
  );
};

export default ProfilePage;
