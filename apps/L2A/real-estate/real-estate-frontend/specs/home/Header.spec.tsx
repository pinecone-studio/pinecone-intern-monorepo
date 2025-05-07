import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/_components/Header';

jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} />;
  MockImage.displayName = 'MockNextImage';
  return MockImage;
});

import { usePathname } from 'next/navigation';
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  it('renders default header on non-admin page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Home Vault')).toBeInTheDocument();
    expect(screen.getByText('Зар оруулах')).toBeInTheDocument();
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument();
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
  });

  it('renders admin text only on /admin route', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin');

    render(<Header />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.queryByText('Зар оруулах')).not.toBeInTheDocument();
    expect(screen.queryByText('Бүртгүүлэх')).not.toBeInTheDocument();
    expect(screen.queryByText('Нэвтрэх')).not.toBeInTheDocument();
  });
});
