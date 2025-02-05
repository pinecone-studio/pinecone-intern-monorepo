import ForgotPasswordPage from '@/components/auth/ForgotPasswordPage';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<ForgotPasswordPage />);
  });
});
