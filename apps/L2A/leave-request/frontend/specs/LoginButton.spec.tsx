import { render, screen } from '@testing-library/react';
import { LoginButton } from '@/app/login/_components/Buton'; 

describe('LoginButton', () => {
  it('renders enabled when not disabled', () => {
    render(<LoginButton disabled={false} />);
    const button = screen.getByRole('button', { name: /Нэвтрэх/i });
    expect(button.getAttribute('disabled')).toBeNull(); 
  });

  it('renders disabled when disabled=true', () => {
    render(<LoginButton disabled={true} />);
    const button = screen.getByRole('button', { name: /Нэвтрэх/i });
    expect(button.getAttribute('disabled')).toBe(''); 
  });
});

