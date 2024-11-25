import RecoveryEmail from '@/components/maincomponents/RecoveryEmail';
import { render } from '@testing-library/react';

describe('RecoveryEmail-Page', () => {
  it('should render RecoveryEmail', async () => {
    render(<RecoveryEmail header="Нууц үг сэргээх" emailLabel="Имэйл хаяг:" buttonText="Үргэлжлүүлэх" />);
  });
});
