import SignIn from '@/components/maincomponents/SignIn';
import { render } from '@testing-library/react';

describe('SignIn-Page', () => {
  it('should render RecoveryEmail', async () => {
    render(
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
  });
});
