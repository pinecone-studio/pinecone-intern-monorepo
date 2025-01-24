import { SignUp } from '@/components/sign-up/SignUp';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <div data-href={href}>{children}</div>;
    },
  };
});

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Component', () => {
  let mockPush: jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form elements correctly', () => {
    render(<SignUp />);

    const heading = screen.getByTestId('burtguuleh-title');
    expect(heading).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    expect(emailInput).toBeInTheDocument();

    const passwordSection = screen.getByTestId('password-uusgeh');
    expect(passwordSection).toBeInTheDocument();

    const firstPasswordInput = screen.getByTestId('first-password');
    const secondPasswordInput = screen.getByTestId('second-password');
    expect(firstPasswordInput).toBeInTheDocument();
    expect(secondPasswordInput).toBeInTheDocument();

    const submitButton = screen.getByTestId('burtguuleh-click-button');
    expect(submitButton).toBeInTheDocument();

    const loginLink = screen.getByText(/нэвтрэх/i);
    expect(loginLink).toBeInTheDocument();
  });

  it('renders Link component with correct href', () => {
    render(<SignUp />);

    const linkWrapper = screen.getByText(/нэвтрэх/i).closest('div');
    expect(linkWrapper).toHaveAttribute('data-href', '/login');
  });

  it('does not navigate on form submission', async () => {
    render(<SignUp />);

    const submitButton = screen.getByTestId('burtguuleh-click-button');
    await userEvent.click(submitButton);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
