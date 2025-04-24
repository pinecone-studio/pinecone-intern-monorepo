import { SignUp } from '@/app/auth/_components/SignUp';
import { render } from '@testing-library/react';

describe('render signup.tsx', () => {
  it('render signup component', () => {
    render(<SignUp />);
  });
});
