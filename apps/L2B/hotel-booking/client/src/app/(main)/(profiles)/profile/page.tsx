import { PersonalInformation } from './_feature/PersonalInformation';
import { Suspense } from 'react';

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonalInformation />
    </Suspense>
  );
};
export default ProfilePage;
