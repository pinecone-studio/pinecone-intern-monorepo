/**
 * @jest-environment jsdom
 */
'use client';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicketTab } from '@/components/TicketTab';

// Mock the DatePickerAdmin component
jest.mock('@/components/DatePickerAdmin', () => ({
  DatePickerAdmin: ({ selectedDate, onDateChange }: { selectedDate: Date | null; onDateChange: (date: Date | null) => void }) => (
    <input
      data-testid="date-picker-admin"
      type="text"
      placeholder="Date picker"
      value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
      onChange={(_e) => {
        const date = new Date('2024-01-01');
        onDateChange(date);
      }}
    />
  ),
}));

// Mock the TicketAddDialog component
jest.mock('@/components/TicketAddDialog', () => ({
  TicketAddDialog: ({ ticketAddDialog, setTicketAddDialog }) =>
    ticketAddDialog ? (
      <div data-testid="ticket-add-dialog">
        <button onClick={() => setTicketAddDialog(false)}>Close</button>
      </div>
    ) : null,
}));

describe('TicketTab', () => {
  const defaultProps = {
    activeTab: 'ticket' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders ticket tab content when activeTab is ticket', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByText('Тасалбар')).toBeInTheDocument();
      expect(screen.getByText('Идэвхитэй зарагдаж буй тасалбарууд')).toBeInTheDocument();
      expect(screen.getByText('Тасалбар нэмэх')).toBeInTheDocument();
    });

    it('does not render ticket tab content when activeTab is not ticket', () => {
      render(<TicketTab activeTab="cancelRequest" />);

      expect(screen.queryByText('Тасалбар')).not.toBeInTheDocument();
      expect(screen.queryByText('Тасалбар нэмэх')).not.toBeInTheDocument();
    });

    it('renders search input', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByPlaceholderText('Тасалбар хайх')).toBeInTheDocument();
    });

    it('renders filter section with artist filter', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByText('Уран бүтээлч')).toBeInTheDocument();
      expect(screen.getByText('Davaidasha')).toBeInTheDocument();
      expect(screen.getByText('Хурд')).toBeInTheDocument();
    });

    it('renders clear button', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByText('Цэвэрлэх')).toBeInTheDocument();
    });

    it('renders date picker', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByTestId('date-picker-admin')).toBeInTheDocument();
    });

    it('renders table headers', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.getByText('Онцлох')).toBeInTheDocument();
      expect(screen.getByText('Тоглолтын нэр')).toBeInTheDocument();
      expect(screen.getByText('Артист')).toBeInTheDocument();
      expect(screen.getByText('Нийт тоо: 900')).toBeInTheDocument();
      expect(screen.getByText('VIP: 300')).toBeInTheDocument();
      expect(screen.getByText('Regular: 300')).toBeInTheDocument();
      expect(screen.getByText('Задгай: 300')).toBeInTheDocument();
      expect(screen.getByText('Тоглох өдрүүд')).toBeInTheDocument();
      expect(screen.getByText('Нийт ашиг')).toBeInTheDocument();
      expect(screen.getByText('Үйлдэл')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens ticket add dialog when add button is clicked', () => {
      render(<TicketTab {...defaultProps} />);

      const addButton = screen.getByText('Тасалбар нэмэх');
      fireEvent.click(addButton);

      expect(screen.getByTestId('ticket-add-dialog')).toBeInTheDocument();
    });

    it('closes ticket add dialog when close button is clicked', async () => {
      render(<TicketTab {...defaultProps} />);
      // First open the dialog
      const addButton = screen.getByText('Тасалбар нэмэх');
      fireEvent.click(addButton);
      // Then close it
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);
      // Wait for dialog to be removed
      await waitFor(() => {
        expect(screen.queryByTestId('ticket-add-dialog')).not.toBeInTheDocument();
      });
    });

    it('allows typing in search input', () => {
      render(<TicketTab {...defaultProps} />);

      const searchInput = screen.getByPlaceholderText('Тасалбар хайх');
      fireEvent.change(searchInput, { target: { value: 'Test search' } });

      expect(searchInput).toHaveValue('Test search');
    });
  });

  describe('Styling and Layout', () => {
    it('has correct background color', () => {
      render(<TicketTab {...defaultProps} />);

      const container = screen.getByText('Тасалбар').closest('.bg-\\[\\#F4F4F5\\]');
      expect(container).toBeInTheDocument();
    });

    it('has correct padding and margins', () => {
      render(<TicketTab {...defaultProps} />);

      const container = screen.getByText('Тасалбар').closest('.px-\\[200px\\]');
      expect(container).toBeInTheDocument();
    });

    it('add button has correct styling', () => {
      render(<TicketTab {...defaultProps} />);

      const addButton = screen.getByText('Тасалбар нэмэх');
      expect(addButton).toHaveClass('text-white', 'bg-black', 'rounded-md', 'py-2', 'px-4');
    });

    it('table has correct border styling', () => {
      render(<TicketTab {...defaultProps} />);

      const table = screen.getByText('Онцлох').closest('.border');
      expect(table).toHaveClass('border', 'border-[#E4E4E7]', 'rounded-md');
    });
  });

  describe('State Management', () => {
    it('initializes with ticketAddDialog as false', () => {
      render(<TicketTab {...defaultProps} />);

      expect(screen.queryByTestId('ticket-add-dialog')).not.toBeInTheDocument();
    });

    it('initializes with selectedDate as null', () => {
      render(<TicketTab {...defaultProps} />);

      const datePicker = screen.getByTestId('date-picker-admin');
      expect(datePicker).toHaveValue('');
    });
  });
});
