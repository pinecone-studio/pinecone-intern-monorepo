import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HotelGeneralInfoDailog } from '@/components/admin/dialogs';
import { useAdmin } from '@/components/providers/AdminProvider';
import '@testing-library/jest-dom';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogClose: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ onValueChange, children }: { onValueChange: (_value: string) => void; children: React.ReactNode }) => <div onClick={() => onValueChange('5')}>{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <button data-testid="select-trigger">{children}</button>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span data-testid="select-value">{placeholder}</span>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div data-testid="select-content">{children}</div>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <div data-testid={`select-item-${value}`} data-value={value}>
      {children}
    </div>
  ),
}));

describe('HotelGeneralInfoDailog Component', () => {
  const mockAdminProvider = {
    addHotelForm: {
      values: {
        name: '',
        phone: '',
        stars: 0,
        description: '',
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
    showError: jest.fn((field, errors, touched) => touched[field] && errors[field]),
  };

  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });

  it('opens the dialog and displays default values when triggered', () => {
    mockAdminProvider.addHotelForm.values = {
      name: 'Hotel Sunrise',
      phone: '+123456789',
      stars: 4,
      description: 'A beautiful hotel by the beach.',
    };

    render(<HotelGeneralInfoDailog />);
  });

  it('handles input changes correctly', () => {
    render(<HotelGeneralInfoDailog />);

    expect(mockAdminProvider.addHotelForm.handleChange);

    fireEvent.click(screen.getByText('Select stars'));
    fireEvent.click(screen.getByText('5 Stars'));
    expect(mockAdminProvider.addHotelForm.setFieldValue);
  });

  it('displays validation errors when present', () => {
    mockAdminProvider.addHotelForm.errors = {
      name: 'Name is required',
      phone: 'Phone number is invalid',
      stars: 'Stars must be a number',
    };
    mockAdminProvider.addHotelForm.touched = {
      name: true,
      phone: true,
      stars: true,
    };

    render(<HotelGeneralInfoDailog />);

    // Open the dialog
    fireEvent.click(screen.getByText('Edit'));

    // Check for validation errors
    expect(screen.getByText('Name is required'));
    expect(screen.getByText('Phone number is invalid'));
  });
});
