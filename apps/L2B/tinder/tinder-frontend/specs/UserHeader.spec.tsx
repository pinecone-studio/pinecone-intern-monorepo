import { render, screen } from '@testing-library/react';
import UserHeader from '@/app/_components/UserHeader';
import '@testing-library/jest-dom';

describe('UserHeader component', () => {
  it('renders the Tinder logo', () => {
    render(<UserHeader />);
    const logo = screen.getAllByAltText(/header-image/i)[0];
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/tinder.svg');
  });

  it('renders message and profile links', () => {
    render(<UserHeader />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(1);

    const profileImage = screen.getAllByAltText(/header-image/i)[1];
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', '/header.svg');
  });

  it('renders correct links', () => {
    render(<UserHeader />);

    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));

    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/message');
    expect(hrefs).toContain('/edit-profile');
  });
});
