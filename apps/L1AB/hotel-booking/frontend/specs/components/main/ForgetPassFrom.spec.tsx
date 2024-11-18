import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ForgetPassForm } from '@/components/main';

describe('Main Forget Password Form', () => {
  it('should render the main forget password form', () => {
    render(<ForgetPassForm />);
  });
});
