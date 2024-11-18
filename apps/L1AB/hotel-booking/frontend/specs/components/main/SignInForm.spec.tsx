import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SignInForm } from '@/components/main';

describe('Main Sign In Form', () => {
  it('should render the main sign in form', () => {
    render(<SignInForm />);
  });
});
