import SignUp from '@/components/maincomponents/SignUp';
import { render } from '@testing-library/react';

describe('Sign-Up-Page', () => {
  it('should render RecoveryEmail', async () => {
    render(
      <SignUp
        header="Бүртгүүлэх"
        nameLabel="Нэр:"
        phoneLabel="Утасны дугаар:"
        emailLabel="Имэйл хаяг:"
        passwordLabel="Нууц үг:"
        comfirmPasswordLabel="Нууц үг давтах:"
        buttonText="Бүртгүүлэх"
        footerText="Та бүртгэлтэй хаягтай бол"
        footerLinkText="нэвтрэх"
        footerTextEnd="эсгээр 
  орно уу."
        footerLinkHref="/signin"
      />
    );
  });
});
