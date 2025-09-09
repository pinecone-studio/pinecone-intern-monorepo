import { HomeFooter, HomeHeader, HomeMain, HomePageBackground } from '@/components/HomePage';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeEach(() => {
  mockPush.mockClear();
});

describe('Home page component', () => {
  it('renders header without crashing', () => {
    render(<HomeHeader />);

    const createBtn = screen.getByRole('button', { name: /Create Account/i });
    const loginBtn = screen.getByRole('button', { name: /Log in/i });

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();

    fireEvent.click(loginBtn);
    fireEvent.click(createBtn);

    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  it('renders bg without crashing with mock users', () => {
    render(<HomePageBackground />);
  });

  it('renders main section ', () => {
    render(<HomeMain />);
    expect(screen.getByText('Swipe Right®')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();

    const createBtn = screen.getByRole('button', { name: /Create Account/i });
    fireEvent.click(createBtn);
    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  it('renders footer section ', () => {
    render(<HomeFooter />);
    expect(screen.getByText('© Copyright 2025')).toBeInTheDocument();
  });
});
