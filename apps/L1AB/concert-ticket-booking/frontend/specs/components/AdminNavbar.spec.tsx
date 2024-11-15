import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AdminNavbar } from '@/components/AdminNavbar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('AdminNavbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should apply "border-b-black border-b-2" class when pathname is "/admin"', () => {
    usePathname.mockReturnValue('/admin');

    const { getByTestId } = render(<AdminNavbar />);
    const adminLink = getByTestId('/admin');

    expect(adminLink).toHaveClass('border-b-black border-b-2');
  });

  it('should not apply "border-b-black border-b-2" class to "/admin/cancel" link when pathname is "/admin"', () => {
    usePathname.mockReturnValue('/admin');

    const { getByTestId } = render(<AdminNavbar />);
    const cancelLink = getByTestId('/admin/cancel');

    expect(cancelLink).not.toHaveClass('border-b-black border-b-2');
  });

  it('should apply "border-b-black border-b-2" class when pathname is "/admin/cancel"', () => {
    usePathname.mockReturnValue('/admin/cancel');

    const { getByTestId } = render(<AdminNavbar />);
    const cancelLink = getByTestId('/admin/cancel');

    expect(cancelLink).toHaveClass('border-b-black border-b-2');
  });
});
