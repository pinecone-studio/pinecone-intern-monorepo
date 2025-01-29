import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import AdminHeader from '@/components/admin-page-comp/AdminHeader';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="image" {...props} />;
  },
}));

describe('AdminHeader', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders the header with logo and user image', () => {
    render(<AdminHeader />);

    const logoImage = screen.getByAltText('logo');
    const userImage = screen.getByAltText('user');

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/Logo.png');
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute('src', '/user.jpeg');
  });

  it('renders all navigation buttons with correct links', () => {
    render(<AdminHeader />);

    const navLinks = [
      { text: 'Захиалга', href: '/admin/dashboard' },
      { text: 'Цэс', href: '/admin/dashboard/menu' },
      { text: 'Хоол', href: '/admin/dashboard/foods' },
      { text: 'Ширээ', href: '/admin/dashboard/tables' },
    ];

    navLinks.forEach(({ text, href }) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toHaveAttribute('href', href);
    });
  });
});
