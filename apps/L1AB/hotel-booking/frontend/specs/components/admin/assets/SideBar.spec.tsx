import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SideBar } from '@/components/admin/assets';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Admin Side Bar', () => {
  it('should render the admin side bar hotels path', () => {
    usePathname.mockReturnValue('/admin/hotels');

    render(<SideBar />);
  });
  it('should render the admin side bar guests path', () => {
    usePathname.mockReturnValue('/admin/guests');

    render(<SideBar />);
  });
});