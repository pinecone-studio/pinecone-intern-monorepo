import { render, screen, fireEvent } from '@testing-library/react';
import StatusChange from '@/app/admin/_components/StatusChange';
import '@testing-library/jest-dom';

describe('StatusChange component', () => {
  it('renders Edit Profile button', () => {
    render(<StatusChange />);
    expect(screen.getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument();
  });

  it('opens dialog with correct content when button is clicked', () => {
    render(<StatusChange />);

    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));

    expect(screen.getByText('Төлөв өөрчлөх')).toBeInTheDocument();
    expect(screen.getByText(/“И\.Алтангэрэл” харилцагчийн төлбөрийн буцаалтын шилжүүлсэн үү\./)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /шилжүүлсэн/i })).toBeInTheDocument();
  });
});
