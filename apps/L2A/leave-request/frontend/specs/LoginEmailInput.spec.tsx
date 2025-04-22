import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';  
import { EmailInput } from '@/app/login/_components/Input';

describe('EmailInput', () => {
  it('renders correctly', () => {
    const register = jest.fn();  
    render(<EmailInput register={register} />);
    const inputElement = screen.getByRole('textbox', { name: /Имэйл хаяг/i });
    expect(inputElement).toBeInTheDocument();  
  });

  it('applies the correct border color when hasError is true', () => {
    const register = jest.fn(); 
    render(<EmailInput register={register} hasError={true} />);
    const inputElement = screen.getByRole('textbox', { name: /Имэйл хаяг/i });
    expect(inputElement).toHaveClass('border-red-500'); 
  });

  it('applies the correct border color when hasError is false', () => {
    const register = jest.fn();  
    render(<EmailInput register={register} hasError={false} />);
    const inputElement = screen.getByRole('textbox', { name: /Имэйл хаяг/i });
    expect(inputElement).toHaveClass('border-gray-300'); 
  });
});

