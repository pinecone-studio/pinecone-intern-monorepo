import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Otp } from '@/components/main';

describe('Main OTP Form', () => {
  it('should render the main otp form', () => {
    render(<Otp />);
  });
});
