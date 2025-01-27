import ResetPassword from '@/components/ResetPassword';
import { render } from '@testing-library/react';

describe('ResetPasswordPage render successfull', () => {
  it('should render otp', async () => {
    render(<ResetPassword />);
  });
});
