import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { GeneralInfoDialog } from '../../../../src/components/admin/dialogs/GeneralInfoDialog';
import { useAdmin } from '@/components/providers/AdminProvider';

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
  Select: ({ children, onValueChange }: { children: React.ReactNode; onValueChange: (_value: string) => void }) => <div onClick={() => onValueChange('TWO')}>{children}</div>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: ({ placeholder }: { placeholder: string }) => <div>{placeholder}</div>,
  SelectLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('Admin General Info Dialog', () => {
  const mockAdminProvider = {
    addRoomForm: {
      values: {
        name: '',
        description: '',
        roomNumber: '',
        roomType: 'ONE',
        price: 0,
        photos: [],
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
  };

  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });
  it('should render the GeneralInfoDialog', () => {
    mockAdminProvider.addRoomForm.values = {
      name: 'Room 1',
      description: 'A cozy room with a view.',
      roomNumber: '101',
      roomType: 'ONE',
      price: 150,
      photos: [],
    };
    render(<GeneralInfoDialog />);
  });
  it('handles input changes correctly', () => {
    render(<GeneralInfoDialog />);

    expect(mockAdminProvider.addRoomForm.handleChange);

    fireEvent.click(screen.getByText('Select Type'));
    fireEvent.click(screen.getByText('Double'));
    expect(mockAdminProvider.addRoomForm.setFieldValue);
  });
});
