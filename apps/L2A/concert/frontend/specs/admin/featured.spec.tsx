import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Featured from '@/app/admin/_components/Featured';

describe('Featured component', () => {
  it('renders the Edit Profile button', () => {
    render(<Featured />);
    expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
  });

  it('opens the dialog when Edit Profile is clicked', () => {
    render(<Featured />);
    const button = screen.getByRole('button', { name: 'Edit Profile' });
    fireEvent.click(button);
    expect(screen.getByText('Онцлох тоглолт болгох')).toBeInTheDocument();
  });

  it('displays both radio options "Тийм" and "Үгүй"', () => {
    render(<Featured />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));
    expect(screen.getByLabelText('Тийм')).toBeInTheDocument();
    expect(screen.getByLabelText('Үгүй')).toBeInTheDocument();
  });

  it('checks default selected radio is "Үгүй"', () => {
    render(<Featured />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));
    const noOption = screen.getByLabelText('Үгүй');
    expect(noOption.getAttribute('aria-checked')).toBe('true');
  });

  it('allows selecting "Тийм" radio option', () => {
    render(<Featured />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));
    const yesOption = screen.getByLabelText('Тийм');
    fireEvent.click(yesOption);
    expect(yesOption.getAttribute('aria-checked')).toBe('true');
  });

  it('renders the "Хадгалах" save button', () => {
    render(<Featured />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));
    expect(screen.getByRole('button', { name: 'Хадгалах' })).toBeInTheDocument();
  });
});
