import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SignUpForm } from '@/components/main';

describe('Main Sign Up Form', () => {
  it('should render the main sign up form', () => {
    render(<SignUpForm />);
  });
});
