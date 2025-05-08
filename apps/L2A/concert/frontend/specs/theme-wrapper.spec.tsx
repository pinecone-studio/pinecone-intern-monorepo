import { render, screen } from '@testing-library/react';
import ThemeWrapper from '@/app/_components/ThemeWrapper';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@/app/_components/Header', () => {
  const MockHeader = () => <div>Default Header</div>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});
jest.mock('@/app/admin/_components/AdminHeader', () => {
  const MockAdminHeader = () => <div>Admin Header</div>;
  MockAdminHeader.displayName = 'MockAdminHeader';
  return MockAdminHeader;
});

describe('ThemeWrapper', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('renders AdminHeader and removes dark class on /admin path', () => {
    usePathname.mockReturnValue('/admin');

    render(
      <ThemeWrapper>
        <div>Admin Content</div>
      </ThemeWrapper>
    );

    expect(screen.getByText('Admin Header')).toBeInTheDocument();
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('renders Default Header and adds dark class on non-admin path', () => {
    usePathname.mockReturnValue('/home');

    render(
      <ThemeWrapper>
        <div>User Content</div>
      </ThemeWrapper>
    );

    expect(screen.getByText('Default Header')).toBeInTheDocument();
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
