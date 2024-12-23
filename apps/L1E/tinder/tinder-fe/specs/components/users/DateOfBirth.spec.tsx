import DateOfBirth from '@/components/signup/DateOfBirth';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DateOfBirth Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the age step initially', () => {
    render(<DateOfBirth />);

    expect(screen.getByText('How old are you'));
    expect(screen.getByPlaceholderText('age'));
    expect(screen.getByText('Next'));
  });

  it('loads age from localStorage if available', () => {
    localStorage.setItem('signupFormData', JSON.stringify({ age: '25' }));

    render(<DateOfBirth />);

    expect(screen.getByDisplayValue('25'));
  });

  it('updates age in localStorage when changed', () => {
    render(<DateOfBirth />);

    const input = screen.getByPlaceholderText('age');
    fireEvent.change(input, { target: { value: '30' } });

    const storedData = JSON.parse(localStorage.getItem('signupFormData'));
    expect(storedData.age).toBe('30');
  });

  it('navigates to the detail step when Next is clicked and age is provided', () => {
    render(<DateOfBirth />);

    const input = screen.getByPlaceholderText('age');
    fireEvent.change(input, { target: { value: '20' } });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // expect(screen.queryByText('How old are you')).not;
  });

  it('does not navigate to the detail step when Next is clicked without an age', () => {
    render(<DateOfBirth />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('How old are you'));
  });
  it('does not navigate to the detail step when Next is clicked without an age', () => {
    render(<DateOfBirth />);

    Storage.prototype.getItem = jest.fn(() => null);

    // fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12345' } });
    // fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: '12345' } });
  });
});
