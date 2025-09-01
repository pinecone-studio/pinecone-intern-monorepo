import React, { ReactNode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowOldAreYou from '@/components/HowOldAreYou';
import { validateDate } from '@/components/date-utils';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange, 'data-testid': t }: { children: ReactNode; value: string; onValueChange: (_v: string) => void; 'data-testid': string }) => (
    <select data-testid={t} value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ value, children }: { value: string; children: ReactNode }) => <option value={value}>{children}</option>,
  SelectValue: ({ placeholder }: { placeholder: string }) => <>{placeholder}</>,
}));

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  PopoverTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, disabled }: { onSelect: (_d?: Date) => void; disabled: (_d: Date) => boolean }) => (
    <div data-testid="calendar-component">
      <button data-testid="day-1" onClick={() => onSelect(new Date(2000, 0, 1))} aria-disabled={disabled(new Date(2000, 0, 1)) ? 'true' : 'false'}>
        1
      </button>
      <button data-testid="future-day" onClick={() => onSelect(new Date(3000, 0, 1))} aria-disabled={disabled(new Date(3000, 0, 1)) ? 'true' : 'false'}>
        1
      </button>
      <button data-testid="undefined-day" onClick={() => onSelect(undefined)}>
        undefined
      </button>
    </div>
  ),
}));

jest.mock('@/components/date-utils', () => ({ ...jest.requireActual('@/components/date-utils'), validateDate: jest.fn() }));

beforeAll(() => {
  Element.prototype.hasPointerCapture = () => false;
});

describe('HowOldAreYou', () => {
  const mockOnSuccess = jest.fn(),
    mockOnBack = jest.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    jest.clearAllMocks();
    user = userEvent.setup();
    (validateDate as jest.Mock).mockImplementation((_d: Date | undefined, _current: Date) =>
      !_d
        ? { isValid: false, error: 'Please enter your date of birth' }
        : _current.getFullYear() - _d.getFullYear() < 18
        ? { isValid: false, error: 'You must be at least 18 years old.' }
        : { isValid: true, error: '' }
    );
  });

  it('back button works', () => {
    render(<HowOldAreYou onBack={mockOnBack} />);
    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('shows error if no date', () => {
    render(<HowOldAreYou />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('error-message')).toHaveTextContent('Please enter your date of birth');
  });

  it('calls onSuccess if valid date', async () => {
    const d = new Date(2000, 0, 1);
    render(<HowOldAreYou onSuccess={mockOnSuccess} initialDate={d} />);
    fireEvent.click(screen.getByTestId('next-button'));
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledWith(d));
  });

  it('selecting day updates button text', async () => {
    render(<HowOldAreYou />);
    await user.click(screen.getByTestId('date-button'));
    fireEvent.click(screen.getByTestId('day-1'));
    await waitFor(() => expect(screen.getByTestId('date-button')).toHaveTextContent('January 1st, 2000'));
  });

  it('changes year/month', async () => {
    render(<HowOldAreYou />);
    await user.click(screen.getByTestId('date-button'));
    fireEvent.change(screen.getByTestId('year-select'), { target: { value: '2005' } });
    fireEvent.change(screen.getByTestId('month-select'), { target: { value: '9' } });
    expect((screen.getByTestId('year-select') as HTMLSelectElement).value).toBe('2005');
    expect((screen.getByTestId('month-select') as HTMLSelectElement).value).toBe('9');
  });

  it('disables future dates', () => {
    render(<HowOldAreYou currentDate={new Date()} />);
    expect(screen.getByTestId('future-day')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('day-1')).toHaveAttribute('aria-disabled', 'false');
  });

  it('shows error if underage', () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} initialDate={new Date(new Date().getFullYear() - 10, 0, 1)} />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.getByTestId('error-message')).toHaveTextContent('You must be at least 18 years old.');
  });

  it('handles undefined date', () => {
    render(<HowOldAreYou />);
    fireEvent.click(screen.getByTestId('undefined-day'));
    expect(screen.getByTestId('date-button')).toHaveTextContent('Pick a date');
  });

  it('does not override set date', async () => {
    const d = new Date(1990, 5, 15);
    render(<HowOldAreYou initialDate={d} />);
    await user.click(screen.getByTestId('date-button'));
    fireEvent.change(screen.getByTestId('year-select'), { target: { value: '2000' } });
    fireEvent.change(screen.getByTestId('month-select'), { target: { value: '0' } });
    expect(screen.getByTestId('date-button')).toHaveTextContent(format(d, 'PPP'));
  });

  it('does not throw without onSuccess', () => {
    render(<HowOldAreYou initialDate={new Date(2000, 0, 1)} />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('validateDate true with undefined date does not call onSuccess', () => {
    (validateDate as jest.Mock).mockReturnValue({ isValid: true, error: '' });
    render(<HowOldAreYou />);
    fireEvent.click(screen.getByTestId('next-button'));
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('clears error after valid selection', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} />);
    fireEvent.click(screen.getByTestId('next-button'));
    await user.click(screen.getByTestId('date-button'));
    fireEvent.change(screen.getByTestId('year-select'), { target: { value: '2000' } });
    fireEvent.change(screen.getByTestId('month-select'), { target: { value: '0' } });
    fireEvent.click(screen.getByTestId('day-1'));
    fireEvent.click(screen.getByTestId('next-button'));
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
      expect(mockOnSuccess).toHaveBeenCalledWith(expect.any(Date));
    });
  });
});
