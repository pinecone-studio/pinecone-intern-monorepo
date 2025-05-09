import React from 'react';
import ForgetPasswordSteps from './_feature/ForgetPasswordSteps';

const page = () => {
  return (
    <div data-cy="Forget-Password-Page" className="w-full h-screen flex flex-col items-center justify-center">
      <ForgetPasswordSteps />
    </div>
  );
};

export default page;
