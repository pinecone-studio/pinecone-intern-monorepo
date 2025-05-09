import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import LayoutClient from '@/app/_components/LayoutClient';

jest.mock('@/app/_components/Header', () => {
  const MockHeader = () => <div>Mocked Header</div>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

jest.mock('@/app/_components/Footer', () => {
  const MockFooter = () => <div>Mocked Footer</div>;
  MockFooter.displayName = 'MockFooter';
  return MockFooter;
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('LayoutClient', () => {
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header and Footer on non-auth routes', () => {
    mockUsePathname.mockReturnValue('/home');

    render(
      <LayoutClient>
        <div>Home Page Content</div>
      </LayoutClient>
    );

    expect(screen.getByText('Home Page Content')).toBeInTheDocument();
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });

  it('does not render Header and Footer on /signin route', () => {
    mockUsePathname.mockReturnValue('/signin');

    render(
      <LayoutClient>
        <div>Sign In Page</div>
      </LayoutClient>
    );

    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked Footer')).not.toBeInTheDocument();
  });

  it('does not render Header and Footer on /signup route', () => {
    mockUsePathname.mockReturnValue('/signup');

    render(
      <LayoutClient>
        <div>Sign Up Page</div>
      </LayoutClient>
    );

    expect(screen.getByText('Sign Up Page')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked Footer')).not.toBeInTheDocument();
  });
});
