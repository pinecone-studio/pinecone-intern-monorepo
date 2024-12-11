'use client';

import SignUp from '@/components/maincomponents/SignUp';

const Page = () => {
  return (
    <SignUp
      header="Бүртгүүлэх"
      nameLabel="Нэр:"
      phoneLabel="Утасны дугаар:"
      emailLabel="Имэйл хаяг:"
      passwordLabel="Нууц үг:"
      confirmPasswordLabel="Нууц үг давтах:"
      buttonText="Бүртгүүлэх"
      footerText="Та бүртгэлтэй хаягтай бол"
      footerLinkText="нэвтрэх"
      footerTextEnd="хэсгээр 
орно уу."
      footerLinkHref="/signin"
    />
  );
};

export default Page;
