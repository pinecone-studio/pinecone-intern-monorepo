'use client';

import SignIn from '@/components/maincomponents/SignIn';

const Page = () => {
  return (
    <SignIn
      header="Нэвтрэх"
      emailLabel="Имэйл хаяг:"
      passwordLabel="Нууц үг:"
      recoveryLinkText="Нууц үг сэргээх"
      recoveryLinkHref="/recovery"
      buttonText="Нэвтрэх"
      footerText="Та бүртгэлтэй хаяггүй бол"
      footerLinkText="бүртгүүлэх"
      footerTextEnd="хэсгээр
орно уу."
      footerLinkHref="/signup"
    />
  );
};

export default Page;
