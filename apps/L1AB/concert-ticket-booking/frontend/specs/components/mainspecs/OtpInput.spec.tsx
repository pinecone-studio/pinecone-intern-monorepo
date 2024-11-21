import OTPInput from '@/components/maincomponents/OtpInput';
import { render } from '@testing-library/react';

// Mock ResizeObserver to avoid errors during tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('OTPInput Component', () => {
  it('should update state value when OTP input slots change', () => {
    render(<OTPInput footerText={'Имэйл хаяг руу илгээсээн 4 оронтой кодыг оруулна уу'} />);
  });
});
