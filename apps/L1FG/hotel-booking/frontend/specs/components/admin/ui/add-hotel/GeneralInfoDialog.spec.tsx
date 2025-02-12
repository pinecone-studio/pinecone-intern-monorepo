import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { GeneralInfoDialog } from '@/components/admin/ui/dialog';

// Mock Radix UI components
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange }) => (
    <div data-testid="mock-select">
      <button onClick={() => onValueChange('5')}>Select Value</button>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }) => <div>{children}</div>,
  SelectValue: ({ children }) => <div>{children}</div>,
  SelectContent: ({ children }) => <div>{children}</div>,
  SelectGroup: ({ children }) => <div>{children}</div>,
  SelectLabel: ({ children }) => <div>{children}</div>,
  SelectItem: ({ children }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/alert-dialog', () => ({
  AlertDialog: ({ children }) => <div>{children}</div>,
  AlertDialogTrigger: ({ children }) => <div>{children}</div>,
  AlertDialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  AlertDialogTitle: ({ children }) => <div>{children}</div>,
  AlertDialogAction: ({ onClick, children }) => (
    <button onClick={onClick} data-testid="save-button">
      {children}
    </button>
  ),
  AlertDialogCancel: ({ children }) => <button data-testid="cancel-button">{children}</button>,
}));

describe('GeneralInfoDialog', () => {
  const mockProps = {
    name: 'Test Hotel',
    rating: '4.5',
    description: 'A lovely hotel',
    phoneNumber: '123-456-7890',
    setName: jest.fn(),
    setRating: jest.fn(),
    setStarRating: jest.fn(),
    setDescription: jest.fn(),
    setPhoneNumber: jest.fn(),
    handleEditHotelGeneralInfo: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders edit button and dialog content', () => {
    render(<GeneralInfoDialog starRating={''} {...mockProps} />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument();
  });

  test('handles input changes correctly', async () => {
    render(<GeneralInfoDialog starRating={''} {...mockProps} />);

    // Test name input using fireEvent instead of userEvent
    const nameInput = screen.getByDisplayValue('Test Hotel');
    fireEvent.change(nameInput, { target: { value: 'Test Hotel Updated' } });
    expect(mockProps.setName).toHaveBeenCalledWith('Test Hotel Updated');

    // Test description input
    const descriptionInput = screen.getByDisplayValue('A lovely hotel');
    fireEvent.change(descriptionInput, { target: { value: 'A lovely hotel Updated' } });
    expect(mockProps.setDescription).toHaveBeenCalledWith('A lovely hotel Updated');

    // Test phone number input
    const phoneInput = screen.getByDisplayValue('123-456-7890');
    fireEvent.change(phoneInput, { target: { value: '123-456-78900' } });
    expect(mockProps.setPhoneNumber).toHaveBeenCalledWith('123-456-78900');

    // Test rating input
    const ratingInput = screen.getByDisplayValue('4.5');
    fireEvent.change(ratingInput, { target: { value: '4.55' } });
    expect(mockProps.setRating).toHaveBeenCalledWith('4.55');
  });

  test('handles star rating selection', async () => {
    render(<GeneralInfoDialog starRating={''} {...mockProps} />);
    const selectButton = screen.getByText('Select Value');
    await userEvent.click(selectButton);
    expect(mockProps.setStarRating).toHaveBeenCalledWith('5');
  });

  test('handles save action', async () => {
    render(<GeneralInfoDialog starRating={''} {...mockProps} />);
    const saveButton = screen.getByTestId('save-button');
    await userEvent.click(saveButton);
    expect(mockProps.handleEditHotelGeneralInfo).toHaveBeenCalledTimes(1);
  });

  test('handles cancel action', () => {
    render(<GeneralInfoDialog starRating={''} {...mockProps} />);
    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
  });
});
