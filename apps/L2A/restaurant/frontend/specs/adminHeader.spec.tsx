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
  value: jest.fn().mockImplementation((query) => ({
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
  it('should not have a mobile menu button', () => {
    render(<AdminHeader />);
    const menuButton = screen.queryByLabelText('Toggle menu');
    expect(menuButton).not.toBeInTheDocument();
  });
  it('should highlight menu item on hover', () => {
    render(<AdminHeader />);
    const menuItems = screen.getAllByText(/Захиалга|Төсөв|Хоол|Ширээ/);
    const secondItem = menuItems[1];
    fireEvent.mouseEnter(secondItem);
    expect(secondItem).toHaveClass('hover:bg-gray-100');
  });
});
