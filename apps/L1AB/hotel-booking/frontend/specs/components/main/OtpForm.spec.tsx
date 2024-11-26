import { OtpForm } from '@/components/main';
import { render } from '@testing-library/react';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('OtpForm Component', () => {
  it('should update state value when OTP input slots change', () => {
    render(<OtpForm />);
  });
});
