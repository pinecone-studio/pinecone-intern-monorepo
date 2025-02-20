/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHeader from '@/components/admin-page-comp/AdminHeader';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';

// Mock the next/navigation router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock NavButton component
jest.mock('@/components/admin-page-comp/NavButton', () => {
  return ({ children, href }) => (
    <a data-testid={`nav-button-${href.split('/').pop()}`} href={href}>
      {children}
    </a>
  );
});

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('AdminHeader Component', () => {
  let pushMock;

  beforeEach(() => {
    // Setup router mock
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders correctly with all elements', () => {
    render(<AdminHeader />);

    // Check if logo is rendered
    expect(screen.getByAltText('logo')).toBeInTheDocument();

    // Check if user image is rendered
    expect(screen.getByAltText('user')).toBeInTheDocument();

    // Check if navigation buttons are rendered
    expect(screen.getByTestId('nav-button-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('nav-button-menu')).toBeInTheDocument();
    expect(screen.getByTestId('nav-button-foods')).toBeInTheDocument();
    expect(screen.getByTestId('nav-button-tables')).toBeInTheDocument();

    // Check navigation button content
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
    expect(screen.getByText('Цэс')).toBeInTheDocument();
    expect(screen.getByText('Хоол')).toBeInTheDocument();
    expect(screen.getByText('Ширээ')).toBeInTheDocument();
  });

  test('shows dropdown content when user icon is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<AdminHeader />);

    const triggerBtn = screen.getByTestId('userr');

    await user.click(triggerBtn);

    const logoutButton = screen.getByRole('button', { name: 'Гарах' });
    expect(logoutButton).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'test-token');

    render(<AdminHeader />);

    // Click the user avatar to open dropdown
    const triggerBtn = screen.getByTestId('userr');

    await user.click(triggerBtn);

    fireEvent.click(screen.getByRole('button', { name: 'Гарах' }));

    // Verify token was removed from localStorage
    expect(localStorage.getItem('token')).toBeNull();

    // Verify router push was called with correct path
    expect(pushMock).toHaveBeenCalledWith('/admin/login');
  });

  test('navigation links have correct hrefs', () => {
    render(<AdminHeader />);

    // Check if each NavButton has the correct href
    expect(screen.getByTestId('nav-button-dashboard')).toHaveAttribute('href', '/admin/dashboard');
    expect(screen.getByTestId('nav-button-menu')).toHaveAttribute('href', '/admin/dashboard/menu');
    expect(screen.getByTestId('nav-button-foods')).toHaveAttribute('href', '/admin/dashboard/foods');
    expect(screen.getByTestId('nav-button-tables')).toHaveAttribute('href', '/admin/dashboard/tables');
  });
});
