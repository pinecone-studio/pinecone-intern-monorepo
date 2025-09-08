/* eslint-disable max-lines */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetMeDocument } from '@/generated';
import { MenuContent, MyProfile, MyProfileHeader, SidebarMenu } from '@/components/MyProfile';
import '@testing-library/jest-dom';

// Mock child components (avoid actual Apollo hooks inside them)
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

// Apollo mocks
const mockGetMeQuery: MockedResponse = {
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

const mockGetMeQueryError: MockedResponse = {
  request: {
    query: GetMeDocument,
  },
  error: new Error('Failed to fetch user data'),
};

// Test wrapper with MockedProvider
const TestWrapper = ({ children, mocks = [mockGetMeQuery] }: { children: React.ReactNode; mocks?: MockedResponse[] }) => (
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
  beforeEach(() => {
    mockPush.mockClear();
    mockRemoveItem.mockClear();
  });

  it('handles logout button click - removes token and redirects', async () => {
    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    render(
      <TestWrapper>
        <SidebarMenu menu="logout" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />
      </TestWrapper>
    );

    const user = userEvent.setup();
    const logoutButton = screen.getByRole('button', { name: /Log out/i });

    await user.click(logoutButton);

    expect(mockRemoveItem).toHaveBeenCalledWith('token');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('handles localStorage error gracefully during logout', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(); // 👈 энд log гэж солих

    mockRemoveItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    render(
      <TestWrapper>
        <SidebarMenu menu="logout" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />
      </TestWrapper>
    );

    const user = userEvent.setup();
    const logoutButton = screen.getByRole('button', { name: /Log out/i });
    await user.click(logoutButton);

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error)); // 👈 log дээр spy хийсэн учраас ажиллана
    expect(mockPush).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('applies correct styling to logout button when menu is not logout', () => {
    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    render(
      <TestWrapper>
        <SidebarMenu menu="profile" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />
      </TestWrapper>
    );

    const logoutButton = screen.getByRole('button', { name: /Log out/i });
    expect(logoutButton).toHaveClass('bg-transparent');
    expect(logoutButton).toHaveClass('hover:bg-[#F4F4F5]');
    expect(logoutButton).toHaveClass('text-[#E11D48E5]');
  });

  it('applies correct styling to logout button when menu is logout', () => {
    const mockSetMenu = jest.fn();
    const mockSetIsOpen = jest.fn();

    render(
      <TestWrapper>
        <SidebarMenu menu="logout" setMenu={mockSetMenu} isOpen={false} setIsOpen={mockSetIsOpen} />
      </TestWrapper>
    );

    const logoutButton = screen.getByRole('button', { name: /Log out/i });
    expect(logoutButton).toHaveClass('bg-[#F4F4F5]');
    expect(logoutButton).toHaveClass('hover:bg-[#E4E4E7]');
    expect(logoutButton).toHaveClass('text-[#E11D48E5]');
  });
});

describe('MenuContent Component', () => {
  it('renders MyProfileForm when profile menu is selected', () => {
    render(
      <TestWrapper>
        <MenuContent menu="profile" user={{ name: 'Test User', email: 'test@example.com' }} images={[]} setImages={jest.fn()} />
      </TestWrapper>
    );
    expect(screen.getByText('MyProfileForm Component')).toBeInTheDocument();
  });

  it('renders MyImages when images menu is selected', () => {
    render(
      <TestWrapper>
        <MenuContent menu="images" user={{ name: 'Test User', email: 'test@example.com' }} images={['image1.jpg', 'image2.jpg']} setImages={jest.fn()} />
      </TestWrapper>
    );
    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
  });

  it('renders nothing visible when an invalid menu type is passed', () => {
    render(
      <TestWrapper>
        <MenuContent menu={'invalid' as unknown as 'profile'} user={{}} images={[]} setImages={jest.fn()} />
      </TestWrapper>
    );

    // харагдаж байгаа текст байхгүйг шалгана
    expect(screen.queryByText('MyProfileForm Component')).not.toBeVisible();
    expect(screen.queryByText('MyImages Component')).not.toBeVisible();
    expect(screen.queryByText('Delete Account')).not.toBeVisible();
  });
});

describe('MyProfileHeader Component', () => {
  it('renders the user greeting and email', () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
    };

    render(
      <TestWrapper>
        <MyProfileHeader isOpen={false} setIsOpen={jest.fn()} user={mockUser} />
      </TestWrapper>
    );

    expect(screen.getByText('Hi, Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('uses fallback values when user data is missing', () => {
    render(
      <TestWrapper>
        <MyProfileHeader isOpen={false} setIsOpen={jest.fn()} user={undefined} />
      </TestWrapper>
    );

    expect(screen.getByText('Hi, Name')).toBeInTheDocument();
    expect(screen.getByText('email@example.com')).toBeInTheDocument();
  });

  it('uses fallback values when user properties are null', () => {
    render(
      <TestWrapper>
        <MyProfileHeader isOpen={false} setIsOpen={jest.fn()} user={{ name: null, email: null } as unknown as { name: string; email: string }} />
      </TestWrapper>
    );

    expect(screen.getByText('Hi, Name')).toBeInTheDocument();
    expect(screen.getByText('email@example.com')).toBeInTheDocument();
  });

  it('opens the mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    const setIsOpen = jest.fn();
    render(
      <TestWrapper>
        <MyProfileHeader isOpen={false} setIsOpen={setIsOpen} user={{ name: 'Test', email: 'test@example.com' }} />
      </TestWrapper>
    );
    const button = screen.getByTestId('open-mobile-menu');
    await user.click(button);
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});

describe('Mobile drawer behavior', () => {
  beforeEach(() => {
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
});

