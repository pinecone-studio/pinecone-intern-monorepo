import SignInPage from '@/components/auth/SignInPage';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<SignInPage />);
  });
});
