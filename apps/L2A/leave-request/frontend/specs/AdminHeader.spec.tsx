import { render, screen, fireEvent } from '@testing-library/react';
import { AdminHeader } from '../src/app/admin/_components/AdminHeader';

describe('AdminHeader', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders the logo image and avatar fallback', () => {
    render(<AdminHeader />);
    expect(screen.getByAltText('Pinecone Studio Logo')).not.toBeNull();
    expect(screen.getByText('CN')).not.toBeNull();
  });

  it('toggles between Sun and Moon icon when button is clicked', () => {
    render(<AdminHeader />);
    
    expect(screen.getByLabelText('Sun Icon')).not.toBeNull();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByLabelText('Moon Icon')).not.toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    fireEvent.click(button);
    expect(screen.getByLabelText('Sun Icon')).not.toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});