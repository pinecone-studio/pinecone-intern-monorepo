import React from 'react';
import { render } from '@testing-library/react';
import { LocationDialog } from '@/components/admin/dialogs';
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

describe('LocationDialog Component', () => {
  it('renders the dialog trigger button', () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: { address: '' },
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        errors: {},
        touched: {},
      },
      showError: jest.fn().mockReturnValue(false),
    });

    render(<LocationDialog />);
  });

  it('renders the dialog with input and error message', () => {
    (useAdmin as jest.Mock).mockReturnValue({
      addHotelForm: {
        values: { address: '' },
        handleChange: jest.fn(),
        handleBlur: jest.fn(),
        errors: { address: 'Address is required' },
        touched: { address: true },
      },
      showError: jest.fn().mockImplementation((field, errors, touched) => touched[field] && errors[field]),
    });

    render(<LocationDialog />);
  });
});
