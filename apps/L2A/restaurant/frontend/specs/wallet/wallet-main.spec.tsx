import { render, screen } from '@testing-library/react';
import WalletPage from '@/app/wallet/page';
import '@testing-library/jest-dom';
import Header from '@/app/_components/Header';

describe('WalletPage', () => {
  it('renders the full wallet page with title, balance, label, and white section', () => {
    render(<Header />);
    render(<WalletPage />);
    expect(screen.getByText('Хэтэвч')).toBeInTheDocument();
    expect(screen.getByText('18,288')).toBeInTheDocument();
    expect(screen.getByText('Үлдэгдэл')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-white-section')).toBeInTheDocument();
  });
});
