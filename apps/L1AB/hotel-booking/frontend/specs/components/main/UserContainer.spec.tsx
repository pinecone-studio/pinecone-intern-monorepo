import { UserContainer } from '@/components/main';
import { useAuth } from '@/components/providers/Auth.Provider';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/components/providers/Auth.Provider', () => ({
  ...jest.requireActual('@/components/providers/Auth.Provider'),
  useAuth: jest.fn(),
}));

describe('UserContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
      },
      signout: jest.fn(),
    });
  });
  it('Should render the main user Container component', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, signout: jest.fn() });

    render(<UserContainer />);
  });

  it('Should render profile when profile button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, signout: jest.fn() });

    render(<UserContainer />);

    const profileButton = screen.getByText('Profile');

    fireEvent.click(profileButton);

    expect(screen.getByText('Personal Information'));
  });

  it('Should render contact info when contact button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
      },
      signout: jest.fn(),
    });

    render(<UserContainer />);

    const contactButton = screen.getByText('Contact');

    fireEvent.click(contactButton);

    expect(screen.getByText('Contact info'));
  });

  it('Should render settings when settings button is clicked', () => {
    render(<UserContainer />);

    const settingsButton = screen.getByText('Settings');

    fireEvent.click(settingsButton);

    expect(screen.getByText('Security & Settings'));
  });
});
