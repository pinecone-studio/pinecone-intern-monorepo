import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { GenderSelect } from '@/components/GenderSelect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => {
    return (
      <div>
        <button data-testid="select-trigger" onClick={() => onValueChange('Male')}>
          {value || 'Select'}
        </button>
        <div>
          <div onClick={() => onValueChange('Male')}>Male</div>
          <div onClick={() => onValueChange('Female')}>Female</div>
          <div onClick={() => onValueChange('Both')}>Both</div>
        </div>
      </div>
    );
  },
  SelectTrigger: ({ children }: any) => <button data-testid="select-trigger">{children}</button>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectGroup: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <div onClick={() => {}}>{children}</div>,
  SelectValue: ({ placeholder }: any) => <div>{placeholder}</div>,
}));

describe('GenderSelect', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
  });

  it('renders the heading correctly', () => {
    render(<GenderSelect />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
  });

  it('disables Next button initially', () => {
    render(<GenderSelect />);
    const nextButton = screen.getByTestId('Next-Button');
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button after selection and navigates on click', () => {
    render(<GenderSelect />);

    const trigger = screen.getByTestId('select-trigger');
    fireEvent.click(trigger);

    const nextButton = screen.getByTestId('Next-Button');
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(push).toHaveBeenCalledWith('/');
  });
});
