import SignUpPage from '@/components/auth/SignUpPage';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<SignUpPage />);
  });
});
