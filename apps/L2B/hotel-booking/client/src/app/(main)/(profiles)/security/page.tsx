import { Suspense } from 'react';
import { UpdatePassword } from './_feature/UpdatePassword';

const SecurityPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePassword />
    </Suspense>
  );
};
export default SecurityPage;
