import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { useRequestOtpMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import Confirmsignup from '@/components/signup/Confirmsignup';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useRequestOtpMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Confirmsignup Component', () => {
  let mockRouterPush: jest.Mock<any, any, any>;
  let mockRequestOtp: jest.Mock<any, any, any>;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    mockRequestOtp = jest.fn();

    useRouter.mockReturnValue({
      push: mockRouterPush,
    });

    useRequestOtpMutation.mockReturnValue([mockRequestOtp]);
  });

  it('should render and handle OTP input submission', async () => {
    const email = 'uzkhuthef@gmail.com';
    const mockOtpResponse = { data: { requestOtp: { success: true } } };

    mockRequestOtp.mockResolvedValue(mockOtpResponse);

    render(<Confirmsignup />);

    const otpInput = screen.getByTestId('OTPInput');
    fireEvent.change(otpInput, { target: { value: '1234' } });
    expect(otpInput);

    await waitFor(() => {
      expect(mockRequestOtp).toHaveBeenCalledWith({
        variables: {
          input: {
            email,
            otp: '1234',
          },
        },
      });

      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });
});
