import { SignUpPage } from '@/components/sign-up/SignUpPage';
import { render } from '@testing-library/react';
describe('MenuButtons', () => {
  it('Should render', () => {
    render(<SignUpPage />);
  });
});
