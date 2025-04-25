import { render, screen, fireEvent } from '@testing-library/react';
import { AdminHeader } from '../src/app/admin/_components/AdminHeader';

describe('AdminHeader', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders the logo image and avatar fallback', () => {
    render(<AdminHeader />);
    expect(screen.getByAltText('Pinecone Studio Logo')).toBeTruthy();
    expect(screen.getByText('CN')).toBeTruthy();
  });

  it('toggles between Sun and Moon icon when button is clicked', () => {
    render(<AdminHeader />);
    
    expect(screen.getByLabelText('Sun Icon')).toBeTruthy();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByLabelText('Moon Icon')).toBeTruthy();
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();

    fireEvent.click(button);
    expect(screen.getByLabelText('Sun Icon')).toBeTruthy();
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
  });
});