import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { MenuContent, MyProfile, MyProfileHeader } from '@/components/MyProfile';

jest.mock('@/components/MyProfileForm', () => ({
  MyProfileForm: () => <div>MyProfileForm Component</div>,
}));
jest.mock('@/components/MyImages', () => ({
  MyImages: () => <div>MyImages Component</div>,
}));

describe('MyProfile Component', () => {
  it('renders default profile view with Profile selected', () => {
    render(<MyProfile />);

    expect(screen.getByText('MyProfileForm Component'));
    expect(screen.getByRole('button', { name: /Profile/i })).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to Images view when Images menu is clicked', async () => {
    render(<MyProfile />);
    const user = userEvent.setup();

    const imagesButton = screen.getByRole('button', { name: /Images/i });
    await user.click(imagesButton);

    expect(screen.getByText('MyImages Component'));
    expect(imagesButton).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to Appearance view when Appearance menu is clicked', async () => {
    render(<MyProfile />);
    const user = userEvent.setup();

    const appearanceButton = screen.getByRole('button', { name: /Appearance/i });
    await user.click(appearanceButton);

    expect(screen.getByText('Appearance Settings'));
  });

  it('switches to Notifications view when Notifications menu is clicked', async () => {
    render(<MyProfile />);
    const user = userEvent.setup();

    const notificationsButton = screen.getByRole('button', { name: /Notifications/i });
    await user.click(notificationsButton);

    expect(screen.getByText('Notification Settings'));
  });
});

describe('MenuContent Component', () => {
  it('renders fallback (null) when an invalid menu type is passed', () => {
    const { container } = render(<MenuContent menu={'invalid' as any} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('MyProfileHeader Component', () => {
  it('renders the user greeting and email', () => {
    render(
      <MyProfileHeader
        isOpen={false}
        setIsOpen={() => {
          //intentionally empty
        }}
      />
    );
    expect(screen.getByText(/Hi, user/i));
    expect(screen.getByText(/n\.shagai@pinecone\.mn/i));
  });

  it('opens the mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    const setIsOpen = jest.fn();
    render(<MyProfileHeader isOpen={false} setIsOpen={setIsOpen} />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(setIsOpen).toHaveBeenCalledWith(true);
  });
});
describe('Mobile drawer behavior', () => {
  beforeEach(() => {
    // Simulate mobile viewport
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
    window.dispatchEvent(new Event('resize'));
  });

  const openDrawer = async () => {
    const user = userEvent.setup();
    render(<MyProfile />);
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
    expect(screen.queryByTestId('mobile-drawer'));
  });

  it('closes drawer when clicking close (X) button', async () => {
    const user = await openDrawer();
    const closeButton = screen.getByTestId('close-mobile-drawer');
    await user.click(closeButton);
    expect(screen.queryByTestId('mobile-drawer'));
  });

  it('selects a menu item from drawer and closes it', async () => {
    const user = await openDrawer();
    const imagesButton = screen.getByTestId('mobile-menu-button-images');
    await user.click(imagesButton);

    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-drawer'));
  });

  it('applies closed class when isOpen is false', () => {
    render(<MyProfile />);
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer.className).toContain('-translate-x-full'); // Drawer is hidden (offscreen)
  });

  it('applies open class when isOpen is true', async () => {
    await openDrawer();
    const drawer = screen.getByTestId('mobile-drawer');
    expect(drawer.className).toContain('translate-x-0'); // Drawer is visible (onscreen)
  });
});
