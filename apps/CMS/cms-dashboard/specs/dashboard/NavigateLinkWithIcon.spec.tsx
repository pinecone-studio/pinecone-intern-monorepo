import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';
import { NavigateLinkWithIcon } from '@/app/dashboard/_components';
import React from 'react';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavigateLinkWithIcon', () => {
  const usePathnameMock = usePathname as jest.Mock;

  beforeEach(() => {
    usePathnameMock.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the link with text and icon', () => {
    render(<NavigateLinkWithIcon text="Home" myPathName="/" icon={<span>🏠</span>} />);

    const link = screen.getByTestId('navigate-link-with-icon-test-id');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('🏠')).toBeInTheDocument();
  });

  it('applies the active background color when the pathname matches', () => {
    usePathnameMock.mockReturnValue('/');

    render(<NavigateLinkWithIcon text="Home" myPathName="/" icon={<span>🏠</span>} />);

    const link = screen.getByTestId('navigate-link-with-icon-test-id');
    expect(link).toHaveStyle('background-color: #1c202414');
  });

  it('does not apply the active background color when the pathname does not match', () => {
    usePathnameMock.mockReturnValue('/different');

    render(<NavigateLinkWithIcon text="Home" myPathName="/" icon={<span>🏠</span>} />);

    const link = screen.getByTestId('navigate-link-with-icon-test-id');
    expect(link).not.toHaveStyle('background-color: #1c202414');
  });

  it('renders without an icon when no icon is provided', () => {
    render(<NavigateLinkWithIcon text="Home" myPathName="/" />);

    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });
});
