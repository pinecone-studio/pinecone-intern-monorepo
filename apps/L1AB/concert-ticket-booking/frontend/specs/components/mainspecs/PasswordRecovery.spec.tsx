import PasswordRecovery from '@/components/maincomponents/PasswordRecovery';

import { render } from '@testing-library/react';

describe('PasswordRecovery-Page', () => {
  it('should render PasswordRecovery', async () => {
    render(<PasswordRecovery header="Нууц үг сэргээх" passwordLabel="Нууц үг:" comfirmPasswordLabel="Нууц үг давтах:" buttonText="Үргэлжлүүлэх" />);
  });
});
