'use client';

import PasswordRecovery from '@/components/maincomponents/PasswordRecovery';
import React from 'react';

const Page = () => {
  return (
    <div>
      <PasswordRecovery header="Нууц үг сэргээх" passwordLabel="Нууц үг:" comfirmPasswordLabel="Нууц үг давтах:" buttonText="Үргэлжлүүлэх" />;
    </div>
  );
};

export default Page;
