/* eslint-disable max-lines */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { GetMeDocument } from '@/generated';
import { MenuContent, MyProfile, MyProfileHeader, SidebarMenu } from '@/components/MyProfile';
import '@testing-library/jest-dom';
import { initializeApollo } from 'utils/apollo-client';

// Mock the child components
jest.mock('@/components/MyProfileForm', () => ({
  MyProfileForm: () => <div>MyProfileForm Component</div>,
}));
jest.mock('@/components/MyImages', () => ({
  MyImages: () => <div>MyImages Component</div>,
}));
jest.mock('@/components/Loading', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));
jest.mock('../utils/apollo-client', () => ({
  initializeApollo: jest.fn(),
}));

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock localStorage
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    removeItem: mockRemoveItem,
  },
  writable: true,
});

const mockGetMeQuery = {
  request: {
    query: GetMeDocument,
  },
  result: {
    data: {
      getMe: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        images: [],
      },
    },
  },
};

const mockGetMeQueryError = {
  request: {
    query: GetMeDocument,
  },
  error: new Error('Failed to fetch user data'),
};

const TestWrapper = ({ children, mocks = [mockGetMeQuery] }: { children: React.ReactNode; mocks?: any[] }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe('MyProfile Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockRemoveItem.mockClear();
  });

  it('renders default profile view with Profile selected', async () => {
    render(
      <TestWrapper>
        <MyProfile />
      </TestWrapper>
    );
    // Wait for loading to complete
    await screen.findByText('MyProfileForm Component');

    const profileButton = screen.getByRole('button', { name: /Profile/i });
    expect(profileButton).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to Images view when Images menu is clicked', async () => {
    render(
      <TestWrapper>
        <MyProfile />
      </TestWrapper>
    );

    // Wait for component to load
    await screen.findByText('MyProfileForm Component');

    const user = userEvent.setup();

    const imagesButton = screen.getByRole('button', { name: /Images/i });
    await user.click(imagesButton);
    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
    expect(imagesButton).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to settings view when settings menu is clicked', async () => {
    render(
      <TestWrapper>
        <MyProfile />
      </TestWrapper>
    );

    await screen.findByText('MyProfileForm Component');

    const user = userEvent.setup();

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    await user.click(settingsButton);
    expect(screen.getByText('Delete Account')).toBeInTheDocument();
  });

  it('displays error message when query fails', async () => {
    render(
      <TestWrapper mocks={[mockGetMeQueryError]}>
        <MyProfile />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error loading profile/)).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch user data/)).toBeInTheDocument();
    });
  });
});

describe('SidebarMenu Component', () => {
  const mockClearStore = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockRemoveItem.mockClear();
    mockClearStore.mockClear();

    // Make initializeApollo return an object with clearStore
    (initializeApollo as jest.Mock).mockReturnValue({
      clearStore: mockClearStore,
    });
  });

  it('handles logout button click - removes token, clears cache, and redirects', async () => {
    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    render(<SidebarMenu menu="profile" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />);

    const user = userEvent.setup();
    const logoutButton = screen.getByRole('button', { name: /Log out/i });

    await user.click(logoutButton);

    // New assertions
    expect(initializeApollo).toHaveBeenCalled();
    expect(mockClearStore).toHaveBeenCalled();

    // Existing assertions
    expect(mockRemoveItem).toHaveBeenCalledWith('token');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('handles clearStore failure gracefully', async () => {
    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    // Simulate clearStore throwing an error
    mockClearStore.mockRejectedValueOnce(new Error('Apollo cache error'));

    render(<SidebarMenu menu="profile" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />);

    const user = userEvent.setup();
    const logoutButton = screen.getByRole('button', { name: /Log out/i });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intenionally empty
    });

    await user.click(logoutButton);

    expect(initializeApollo).toHaveBeenCalled();
    expect(mockClearStore).toHaveBeenCalled();
    expect(mockRemoveItem).toHaveBeenCalledWith('token');
    expect(mockPush).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
describe('MenuContent Component', () => {
  it('renders MyProfileForm when profile menu is selected', () => {
    render(
      <MenuContent
        menu="profile"
        user={{ name: 'Test User', email: 'test@example.com' }}
        images={[]}
        setImages={() => {
          // intentionally empty
        }}
      />
    );
    expect(screen.getByText('MyProfileForm Component')).toBeInTheDocument();
  });

  it('renders MyImages when images menu is selected', () => {
    render(
      <MenuContent
        menu="images"
        user={{ name: 'Test User', email: 'test@example.com' }}
        images={['image1.jpg', 'image2.jpg']}
        setImages={() => {
          // intentionally empty
        }}
      />
    );
    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
  });
  it('renders fallback (null) when an invalid menu type is passed', () => {
    const { container } = render(
      <MenuContent
        menu={'invalid' as any}
        user={
          {
            // intentionally empty
          }
        }
        images={[]}
        setImages={() => {
          // intentionally empty
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('MyProfileHeader Component', () => {
  it('renders the user greeting and email', () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
    };

    render(
      <MyProfileHeader
        isOpen={false}
        setIsOpen={() => {
          // intentionally empty
        }}
        user={mockUser}
      />
    );
    expect(screen.getByText('Hi, Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('uses fallback values when user data is missing', () => {
    render(
      <MyProfileHeader
        isOpen={false}
        setIsOpen={() => {
          // intentionally empty
        }}
        user={undefined}
      />
    );

    expect(screen.getByText('Hi, Name')).toBeInTheDocument();
    expect(screen.getByText('email@example.com')).toBeInTheDocument();
  });

  it('uses fallback values when user properties are null', () => {
    render(
      <MyProfileHeader
        isOpen={false}
        setIsOpen={() => {
          // intentionally empty
        }}
        user={{ name: null, email: null } as any}
      />
    );

    expect(screen.getByText('Hi, Name')).toBeInTheDocument();
    expect(screen.getByText('email@example.com')).toBeInTheDocument();
  });

  it('opens the mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    const setIsOpen = jest.fn();
    render(<MyProfileHeader isOpen={false} setIsOpen={setIsOpen} user={{ name: 'Test', email: 'test@example.com' }} />);
    const button = screen.getByTestId('open-mobile-menu');
    await user.click(button);
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});

describe('Mobile drawer behavior', () => {
  beforeEach(() => {
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));
    mockPush.mockClear();
    mockRemoveItem.mockClear();
  });

  const openDrawer = async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <MyProfile />
      </TestWrapper>
    );

    // Wait for component to load
    await screen.findByText('MyProfileForm Component');

    const openButton = screen.getByTestId('open-mobile-menu');
    await user.click(openButton);
    return user;
  };

  it('opens drawer when menu button is clicked (mobile only)', async () => {
    await openDrawer();
    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('closes drawer when clicking backdrop', async () => {
    const user = await openDrawer();
    const backdrop = screen.getByTestId('drawer-backdrop');
    await user.click(backdrop);
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer).toHaveClass('-translate-x-full');
  });

  it('closes drawer when clicking close (X) button', async () => {
    const user = await openDrawer();
    const closeButton = screen.getByTestId('close-mobile-drawer');
    await user.click(closeButton);
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer).toHaveClass('-translate-x-full');
  });

  it('selects a menu item from drawer and closes it', async () => {
    const user = await openDrawer();
    const imagesButton = screen.getByTestId('mobile-menu-button-images');
    await user.click(imagesButton);

    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer).toHaveClass('-translate-x-full');
  });

  it('applies closed class when isOpen is false', async () => {
    render(
      <TestWrapper>
        <MyProfile />
      </TestWrapper>
    );

    await screen.findByText('MyProfileForm Component');

    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer.className).toContain('-translate-x-full');
  });
  describe('Logout button styling based on menu state', () => {
    it('has transparent background when menu is not logout', () => {
      render(<SidebarMenu menu="profile" setMenu={jest.fn()} isOpen={false} setIsOpen={jest.fn()} />);
      const logoutButton = screen.getByRole('button', { name: /Log out/i });

      expect(logoutButton).toHaveClass('bg-transparent');
      expect(logoutButton).toHaveClass('hover:bg-[#F4F4F5]');
      expect(logoutButton).toHaveClass('text-[#E11D48E5]');
    });

    it('has highlighted background when menu is logout', () => {
      render(<SidebarMenu menu="logout" setMenu={jest.fn()} isOpen={false} setIsOpen={jest.fn()} />);
      const logoutButton = screen.getByRole('button', { name: /Log out/i });

      expect(logoutButton).toHaveClass('bg-[#F4F4F5]');
      expect(logoutButton).toHaveClass('hover:bg-[#E4E4E7]');
      expect(logoutButton).toHaveClass('text-[#E11D48E5]');
    });
  });
});
