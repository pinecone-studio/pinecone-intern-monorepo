import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { LeftSideBar } from '@/components/LeftSideBar';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('LeftSideBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue('/search');
  });

  it('should apply font-bold class when pathname matches path.path', () => {
    const { getByTestId } = render(<LeftSideBar />);
    const link = getByTestId('/search');
    expect(link).toHaveClass('font-bold');
  });
  it('should apply font-light class when pathname does not match path.path', () => {
    const { getByTestId } = render(<LeftSideBar />);
    const link = getByTestId('/notif');
    expect(link).toHaveClass('font-light');
  });
});
