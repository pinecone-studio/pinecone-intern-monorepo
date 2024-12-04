import { VerifyOtp } from '@/components/maincomponents/VerifyOtp';
import { render } from '@testing-library/react';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('VerifyOtp Component', () => {
  it('should update state value when OTP input slots change', () => {
    render(<VerifyOtp footerText={'Имэйл хаяг руу илгээсээн 6 оронтой кодыг оруулна уу'} />);
  });
});
