import { fireEvent, render } from '@testing-library/react';

import OtpComp from '@/components/Login/OTPpasswordcomp';

describe('OTPcomp', () => {
  it('should OTPcomp', async () => {
    const { getByTestId } = render(<OtpComp />);

    const otp1 = getByTestId('otp0');
    fireEvent.change(otp1, { target: { value: '1' } });

    const otp2 = getByTestId('otp1');
    fireEvent.change(otp2, { target: { value: '1' } });
    fireEvent.keyDown(otp2, { key: 'Backspace' });

    const otp3 = getByTestId('otp2');
    fireEvent.change(otp3, { target: { value: '1' } });
    fireEvent.keyDown(otp3, { key: 'Backspace' });

    const otp4 = getByTestId('otp3');
    fireEvent.change(otp4, { target: { value: '1' } });
  });

  it('should press backspace', async () => {
    const { getByTestId } = render(<OtpComp />);

    const otp1 = getByTestId('otp0');
    fireEvent.change(otp1, { target: { value: '' } });

    const otp2 = getByTestId('otp1');
    fireEvent.change(otp2, { target: { value: '' } });

    const otp3 = getByTestId('otp2');
    fireEvent.change(otp3, { target: { value: '' } });

    fireEvent.keyDown(otp3, { key: 'Backspace' });
  });
  it('should handlesubmit', async () => {
    const { getByTestId } = render(<OtpComp />);

    const handleBtn = getByTestId('handle-btn');
    fireEvent.click(handleBtn);

    const backBtn = getByTestId('back-btn');
    fireEvent.click(backBtn);

    const resentBtn = getByTestId('resent-btn');
    fireEvent.click(resentBtn);
  });
  it('should handlesubmit with all digits are valid', async () => {
    const { getByTestId } = render(<OtpComp />);

    const inp1 = getByTestId('otp0');
    const inp2 = getByTestId('otp1');
    const inp3 = getByTestId('otp2');
    const inp4 = getByTestId('otp3');

    fireEvent.change(inp1, { target: { value: '0' } });
    fireEvent.change(inp2, { target: { value: '0' } });
    fireEvent.change(inp3, { target: { value: '0' } });
    fireEvent.change(inp4, { target: { value: '0' } });

    const handleBtn = getByTestId('handle-btn');
    fireEvent.click(handleBtn);
  });
});
