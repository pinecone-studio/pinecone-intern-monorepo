import { render, screen, fireEvent } from '@testing-library/react';
import AdminHeader from '@/app/admin/_components/Header';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img data-testid={props['data-testid'] || 'next-image'} {...props} />,
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('AdminHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should show desktop navigation items', () => {
    render(<AdminHeader />);
    const navItems = screen.getAllByText(/Захиалга|Төсөв|Хоол|Ширээ/);
    expect(navItems.length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
    expect(screen.getByText('Төсөв')).toBeInTheDocument();
    expect(screen.getByText('Хоол')).toBeInTheDocument();
    expect(screen.getByText('Ширээ')).toBeInTheDocument();
  });
  it('should show avatar component', () => {
    render(<AdminHeader />);
    const avatarFallback = screen.getByText('CN');
    expect(avatarFallback).toBeInTheDocument();
  });

  it('should have a menu button', () => {
    render(<AdminHeader />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
  });

  it('should toggle mobile menu when menu button is clicked', () => {
    render(<AdminHeader />);
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    const mobileMenuItems = screen.getAllByText(/Захиалга|Төсөв|Хоол|Ширээ/);
    expect(mobileMenuItems.some(item => item.className.includes('md:hidden'))).toBe(true);
    fireEvent.click(menuButton);
  });

  it('should highlight active menu item when clicked', () => {
    render(<AdminHeader />);
    const menuItems = screen.getAllByText(/Захиалга|Төсөв|Хоол|Ширээ/);
    const desktopItems = menuItems.filter(item => item.className.includes('hidden md:block'));
    const secondItem = desktopItems[1];
    fireEvent.click(secondItem);
    expect(secondItem.className).toContain('after:bg-black');
    const firstItem = desktopItems[0];
    expect(firstItem.className).toContain('after:bg-transparent');
    expect(secondItem.className).toContain('after:bg-black');
    expect(firstItem.className).toMatch(/after:bg-transparent hover:after:bg-black/);
  });
});
