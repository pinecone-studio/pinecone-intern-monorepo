import { OtpForm } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main OTP Form', () => {
  it('should render the main otp form', () => {
    render(<OtpForm />);
  });
});
