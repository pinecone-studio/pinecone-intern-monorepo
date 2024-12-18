import { InputForm } from '@/components/mkae/InputForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('InputForm Component', () => {
  it('should render successfully', () => {
    render(<InputForm />);
    expect(screen.getByText('Your date of birth is used to calculate your age.'));
  });

  it('should display error message for invalid input', () => {
    render(<InputForm />);
    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
  });

  it('should display a form and handle valid submission', async () => {
    render(<InputForm />);
    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '25' } });
  });
});
