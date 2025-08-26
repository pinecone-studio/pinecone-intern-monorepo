import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { GenderSelect } from '@/components/GenderSelect';

const mockOnSuccess = jest.fn();
const mockUpdateUserData = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ value, onValueChange }: any) => (
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
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
    expect(screen.getByText('Pick the one that feels right for you!')).toBeInTheDocument();
    expect(screen.getByTestId('select-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('Next-Button')).toBeInTheDocument();
  });

  it('initially renders with Next button disabled', () => {
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    expect(screen.getByTestId('Next-Button')).toBeDisabled();
  });

  it('does not navigate when Next is clicked without selection', () => {
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    fireEvent.click(screen.getByTestId('Next-Button'));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('enables Next button when Male is selected', () => {
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    fireEvent.click(screen.getByTestId('option-male'));
    expect(screen.getByTestId('Next-Button')).not.toBeDisabled();
  });

  it('enables Next button when Female is selected', () => {
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    fireEvent.click(screen.getByTestId('option-female'));
    expect(screen.getByTestId('Next-Button')).not.toBeDisabled();
  });

  it('enables Next button when Both is selected', () => {
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);
    fireEvent.click(screen.getByTestId('option-both'));
    expect(screen.getByTestId('Next-Button')).not.toBeDisabled();
  });

  it('logs selected interest and calls onSuccess & updateUserData when Next is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<GenderSelect onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} />);

    fireEvent.click(screen.getByTestId('option-both'));
    fireEvent.click(screen.getByTestId('Next-Button'));

    expect(consoleSpy).toHaveBeenCalledWith('Selected interest:', 'Both');
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockUpdateUserData).toHaveBeenCalledWith({ genderPreferences: 'Both' });

    consoleSpy.mockRestore();
  });
});
