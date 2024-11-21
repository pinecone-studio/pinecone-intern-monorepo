import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchSelectGuest } from '@/components/main/assets';

type SelectProps = {
  value: number;
  open?: boolean;
  onOpenChange?: (_open: boolean) => void;
} & PropsWithChildren;
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, open, onOpenChange, ...props }: SelectProps) => (
    <div {...props} data-open={open} onClick={() => onOpenChange && onOpenChange(!open)}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children, ...props }: PropsWithChildren) => <button {...props}>{children}</button>,
  SelectContent: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
  SelectValue: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
  SelectItem: ({ children, ...props }: PropsWithChildren) => <div {...props}>{children}</div>,
}));

describe('SearchSelectGuest Component', () => {
  const onChangeMock = jest.fn();
  it('renders correctly', () => {
    render(<SearchSelectGuest value={1} onChange={onChangeMock} />);

    expect(screen.getByTestId('guest-select')).toBeInTheDocument();
    expect(screen.getByText('Adult')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('increments the guest count when "+" button is clicked', () => {
    render(<SearchSelectGuest value={1} onChange={onChangeMock} />);

    const plusButton = screen.getByTestId('plus');
    fireEvent.click(plusButton);

    expect(onChangeMock).toHaveBeenCalledWith(2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('decrements the guest count when "-" button is clicked but does not go below 1', () => {
    render(<SearchSelectGuest value={2} onChange={onChangeMock} />);

    const minusButton = screen.getByTestId('minus');
    fireEvent.click(minusButton);

    expect(onChangeMock).toHaveBeenCalledWith(1);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(minusButton);
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('opens and closes the Select dropdown when appropriate', () => {
    render(<SearchSelectGuest value={1} onChange={onChangeMock} />);

    const selectTrigger = screen.getByTestId('select-trigger');
    fireEvent.click(selectTrigger);
    expect(screen.getByText('Travels')).toBeInTheDocument();

    const doneButton = screen.getByTestId('select-done');
    fireEvent.click(doneButton);
    expect(screen.queryByText('<p class="text-lg font-semibold">Travels</p>')).not.toBeInTheDocument();
  });
});
