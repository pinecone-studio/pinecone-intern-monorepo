import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { GenderSelect } from '@/components/GenderSelect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <div>
      <button data-testid="select-trigger">{value || 'Select'}</button>
      <div data-testid="select-options">
        <div data-testid="option-male" onClick={() => onValueChange('Male')}>
          Male
        </div>
        <div data-testid="option-female" onClick={() => onValueChange('Female')}>
          Female
        </div>
        <div data-testid="option-both" onClick={() => onValueChange('Both')}>
          Both
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

describe('GenderSelect', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it('renders all static content correctly', () => {
    render(<GenderSelect />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
    expect(screen.getByText('Pick the one that feels right for you!')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('Next-Button')).toBeInTheDocument();
  });

  it('initially renders with Next button disabled', () => {
    render(<GenderSelect />);
    expect(screen.getByTestId('Next-Button')).toBeDisabled();
  });

  it('does not navigate when Next is clicked without selection', () => {
    render(<GenderSelect />);
    fireEvent.click(screen.getByTestId('Next-Button'));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it.each([
    ['male', 'Male'],
    ['female', 'Female'],
    ['both', 'Both'],
  ])('enables Next button when %s is selected', (testId, label) => {
    render(<GenderSelect />);
    fireEvent.click(screen.getByTestId(`option-${testId}`));
    expect(screen.getByTestId('Next-Button')).not.toBeDisabled();
  });

  it.each([
    ['male', 'Male'],
    ['female', 'Female'],
    ['both', 'Both'],
  ])('navigates to "/" when %s is selected and Next is clicked', (testId, label) => {
    render(<GenderSelect />);
    fireEvent.click(screen.getByTestId(`option-${testId}`));
    fireEvent.click(screen.getByTestId('Next-Button'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('logs selected interest when Next is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<GenderSelect />);
    fireEvent.click(screen.getByTestId('option-both'));
    fireEvent.click(screen.getByTestId('Next-Button'));
    expect(consoleSpy).toHaveBeenCalledWith('Selected interest:', 'Both');
    consoleSpy.mockRestore();
  });
});
