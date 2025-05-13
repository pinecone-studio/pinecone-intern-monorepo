import { render, screen } from '@testing-library/react';
import WalletPayment from '@/app/wallet/_components/WalletPayment';
import '@testing-library/jest-dom';

describe('WalletPayment', () => {
  it('should render payment component', () => {
    render(<WalletPayment amount={324} date="24.10.19" time="15:25" />);
    expect(screen.getByText('+324')).toBeInTheDocument();
    expect(screen.getByText('24.10.19 15:25')).toBeInTheDocument();
  });

  it('should render the arrow icon', () => {
    render(<WalletPayment amount={100} date="01.01.25" time="12:00" />);
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });
});
