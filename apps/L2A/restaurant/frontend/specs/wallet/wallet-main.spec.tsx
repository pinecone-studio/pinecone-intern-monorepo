import { render, screen } from '@testing-library/react';
import WalletPage from '@/app/wallet/page'; 
import '@testing-library/jest-dom';


describe('WalletPage', () => {
  it('renders the header title "Хэтэвч"', () => {
    render(<WalletPage />);
    expect(screen.getByText('Хэтэвч')).toBeInTheDocument();
  });

  it('displays the wallet balance "18,288"', () => {
    render(<WalletPage />);
    expect(screen.getByText('18,288')).toBeInTheDocument();
  });

  it('shows the label "Үлдэгдэл"', () => {
    render(<WalletPage />);
    expect(screen.getByText('Үлдэгдэл')).toBeInTheDocument();
  });

  it('has the bottom white section rendered', () => {
    render(<WalletPage />);
    const whiteSection = screen.getByTestId('wallet-white-section');
    expect(whiteSection).toBeInTheDocument();
  });
});
