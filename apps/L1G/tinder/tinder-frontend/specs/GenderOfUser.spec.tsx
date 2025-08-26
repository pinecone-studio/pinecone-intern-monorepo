import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { GenderOfUser } from '@/components/GenderOfUser';

const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ _, value, onValueChange }: any) => (
    <div>
      <button data-testid="select-trigger-gender">{value || 'Select'}</button>
      <div data-testid="select-options">
        <div data-testid="option-male" onClick={() => onValueChange('Male')}>
          Male
        </div>
        <div data-testid="option-female" onClick={() => onValueChange('Female')}>
          Female
        </div>
      </div>
    </div>
  ),
  SelectTrigger: ({ children }: any) => <button>{children}</button>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectGroup: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <div>{children}</div>,
  SelectValue: ({ placeholder }: any) => <div>{placeholder}</div>,
}));

describe('GenderOfUser', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('renders all static content correctly', () => {
    render(<GenderOfUser onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    expect(screen.getByText('What’s your gender?')).toBeInTheDocument();
    expect(screen.getByText('Please enter your gender to continue.')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger-gender')).toBeInTheDocument();
    expect(screen.getByTestId('Gender-Next-Button')).toBeInTheDocument();
  });

  it('initially renders with Next button disabled', () => {
    render(<GenderOfUser onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    expect(screen.getByTestId('Gender-Next-Button')).toBeDisabled();
  });

  it('does not navigate when Next is clicked without selection', () => {
    render(<GenderOfUser onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    fireEvent.click(screen.getByTestId('Gender-Next-Button'));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it.each([
    ['male', 'Male'],
    ['female', 'Female'],
  ])('enables Next button when %s is selected', (testId: string) => {
    render(<GenderOfUser onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    fireEvent.click(screen.getByTestId(`option-${testId}`));
    expect(screen.getByTestId('Gender-Next-Button')).not.toBeDisabled();
  });

  it('logs selected user.s gender when Next is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<GenderOfUser onSuccess={mockOnSuccess} onBack={mockOnBack} />);
    fireEvent.click(screen.getByTestId('option-male'));
    fireEvent.click(screen.getByTestId('Gender-Next-Button'));
    expect(consoleSpy).toHaveBeenCalledWith('Selected user.s gender:', 'Male');
    consoleSpy.mockRestore();
  });
});
