import { Payment } from '@/components';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
describe('Payment', () => {
  it('should render successfully', async () => {
    render(<Payment id="123" />);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<Payment id="123" />);

    const SuccessToPush = getByTestId('SuccessToPush');
    expect(SuccessToPush);

    fireEvent.click(SuccessToPush);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<Payment id="123" />);

    const BacktoPush = getByTestId('BacktoPush');
    expect(BacktoPush);

    fireEvent.click(BacktoPush);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<Payment id="123" />);

    const QpayClick = getByTestId('QpayClick');
    expect(QpayClick);

    fireEvent.click(QpayClick);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<Payment id="123" />);

    const SocialPayClick = getByTestId('SocialPayClick');
    expect(SocialPayClick);

    fireEvent.click(SocialPayClick);
  });
});
