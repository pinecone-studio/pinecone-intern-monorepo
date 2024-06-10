import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderComp } from '../../src/app/_report/_components';
import '@testing-library/jest-dom';
import * as React from 'react';

jest.mock('../../src/shadcn/Button', () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
}));

jest.mock('../../src/shadcn/DatePicker', () => ({
  format: (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
}));

jest.mock('../../src/shadcn/Popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../src/shadcn/Calendar', () => ({
  Calendar: ({ onSelect }: { onSelect: () => void }) => (
    <div>
      <button onClick={() => onSelect}>Select Date Range</button>
    </div>
  ),
}));

jest.mock('../../src/app/_report/icons/Arrow', () => ({
  Arrow: () => <span>→</span>,
}));

jest.mock('../../src/shadcn/Dialog', () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean; onOpenChange: () => void }) => <div>{open && children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('HeaderComp', () => {
  test('renders correctly', () => {
    render(<HeaderComp />);
    expect(screen.getByText('Репорт')).toBeInTheDocument();
    expect(screen.getByText('7 хоног сонгох')).toBeInTheDocument();
    expect(screen.getByText('Репорт үүсгэх')).toBeInTheDocument();
  });

  test('opens the date picker and selects a date range', () => {
    render(<HeaderComp />);

    fireEvent.click(screen.getByText('7 хоног сонгох'));

    fireEvent.click(screen.getByText('Select Date Range'));

    expect(screen.getByText('Jan 1, 2023 - Jan 7, 2023')).toBeInTheDocument();
  });

  test('opens the dialog when "Generate Report" button is clicked', () => {
    render(<HeaderComp />);

    fireEvent.click(screen.getByText('Репорт үүсгэх'));

    expect(screen.getByText('Репорт үүсгэх')).toBeInTheDocument();
  });
});
