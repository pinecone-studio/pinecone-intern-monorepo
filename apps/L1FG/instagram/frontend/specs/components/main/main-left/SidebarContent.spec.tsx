import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { SidebarContent } from '@/components/home/left/SidebarContent';
jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(() => ({
    user: {
      _id: '134',
    },
  })),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('Sidebar content', () => {
  const mockOpenSearchSheet = jest.fn();
  const mockToggleOpenNotifications = jest.fn();
  const mockCloseSheets = jest.fn();
  const mockRouterPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockRouterPush,
  });
  const user = userEvent.setup();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render', async () => {
    render(<SidebarContent isOpen searchOpen openSearchSheet={mockOpenSearchSheet} toggleNotifications={mockToggleOpenNotifications} closeSheets={mockCloseSheets} />);
    expect(await screen.findByTestId('sidebar-content')).toBeDefined();
  });
  it('Should navigate to /', async () => {
    render(<SidebarContent isOpen searchOpen openSearchSheet={mockOpenSearchSheet} toggleNotifications={mockToggleOpenNotifications} closeSheets={mockCloseSheets} />);
    const buttons = screen.getAllByTestId('text-side-bar-id');
    const firstButton = buttons[0];
    await user.click(firstButton);
    expect(mockRouterPush.mock.lastCall).toEqual(['/']);
    expect(mockCloseSheets.mock.calls.length).toBe(1);
  });
  it('Should navigate to profile', async () => {
    render(<SidebarContent isOpen searchOpen openSearchSheet={mockOpenSearchSheet} toggleNotifications={mockToggleOpenNotifications} closeSheets={mockCloseSheets} />);
    const buttons = screen.getAllByTestId('text-side-bar-id');
    const secondButton = buttons[1];
    await user.click(secondButton);
    expect(mockRouterPush.mock.lastCall).toEqual(['/134']);
    expect(mockCloseSheets.mock.calls.length).toBe(1);
  });
});
