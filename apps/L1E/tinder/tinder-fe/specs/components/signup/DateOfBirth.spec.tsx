import DateOfBirth from '@/components/signup/DateOfBirth';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DateOfBirth Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the age step initially', () => {
    render(<DateOfBirth />);

    expect(screen.getByPlaceholderText('Enter your age'));
    expect(screen.getByText('Next'));
  });

  it('loads age from localStorage if available', () => {
    localStorage.setItem('signupFormData', JSON.stringify({ age: '25' }));

    render(<DateOfBirth />);
  });

  it('updates age in localStorage when changed', () => {
    render(<DateOfBirth />);

    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '30' } });

    const storedData = JSON.parse(localStorage.getItem('signupFormData'));
    expect(storedData.age).toBe('30');
  });

  it('navigates to the detail step when Next is clicked and age is provided', () => {
    render(<DateOfBirth />);

    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '20' } });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
  });

  it('does not navigate to the detail step when Next is clicked without an age', () => {
    render(<DateOfBirth />);

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
  });
  it('does not navigate to the detail step when Next is clicked without an age', () => {
    render(<DateOfBirth />);

    Storage.prototype.getItem = jest.fn(() => null);
  });
  it('does not navigate to the detail step when Next is clicked without an age', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });
});
