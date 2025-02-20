/*eslint-disable*/
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AdminDialog } from '@/components/adminfeature/AdminDialog';
import { useConcertForm } from '@/components/admincontext/DialogContext';
import { validateForm, showToasts } from '@/components/adminfeature/Validation';

const mockHandleSubmit = jest.fn();
const mockUseConcertForm = jest.fn(() => ({
  formData: {
    concertName: '',
    concertPhoto: '',
    concertPlan: '',
    artistName: [''],
    concertDay: '',
    concertTime: '',
    vipTicket: { quantity: '', price: '' },
    regularTicket: { quantity: '', price: '' },
    standingAreaTicket: { quantity: '', price: '' },
  },
  handleSubmit: mockHandleSubmit,
}));
jest.mock('@/components/admincontext/DialogContext', () => ({
  useConcertForm: () => mockUseConcertForm(),
}));

jest.mock('@/components/adminfeature/Validation');
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div data-testid="dialog" data-open={open} onClick={() => onOpenChange(!open)}>
      {children}
    </div>
  ),
  DialogTrigger: ({ children }: any) => <div data-testid="dialog-trigger">{children}</div>,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: any) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => <div data-testid="dialog-title">{children}</div>,
  DialogFooter: ({ children }: any) => <div data-testid="dialog-footer">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, type }: any) => (
    <button data-testid="button" onClick={onClick} type={type}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/adminfeature/FormSection', () => ({
  FormSection: ({ formData, errors }: any) => (
    <div data-testid="form-section" data-formdata={JSON.stringify(formData)} data-errors={JSON.stringify(errors)}>
      Form Section
    </div>
  ),
}));

const defaultFormData = {
  concertName: '',
  concertPhoto: '',
  concertPlan: '',
  artistName: [''],
  concertDay: '',
  concertTime: '',
  vipTicket: { quantity: '', price: '' },
  regularTicket: { quantity: '', price: '' },
  standingAreaTicket: { quantity: '', price: '' },
};

describe('AdminDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseConcertForm.mockClear();
    (validateForm as jest.Mock).mockReturnValue(true);
    (showToasts as jest.Mock).mockImplementation(() => {});
    mockHandleSubmit.mockImplementation((e: React.FormEvent) => {
      e.preventDefault();
      return Promise.resolve();
    });
  });

  it('renders the dialog trigger button', () => {
    render(<AdminDialog />);
    expect(screen.getByTestId('dialog-trigger')).toBeInTheDocument();
  });

  it('opens dialog when trigger button is clicked', async () => {
    render(<AdminDialog />);
    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
  });

  it('renders form content when dialog is open', async () => {
    render(<AdminDialog />);
    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    expect(screen.getByTestId('form-section')).toBeInTheDocument();
    expect(screen.getByText('Үүсгэх')).toBeInTheDocument();
  });

  it('handles form submission with valid data', async () => {
    render(<AdminDialog />);
    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const form = screen.getByTestId('admin-form');
    await fireEvent.submit(form);

    expect(validateForm).toHaveBeenCalled();
    expect(showToasts).toHaveBeenCalledWith(true);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('handles form submission with invalid data', async () => {
    (validateForm as jest.Mock).mockReturnValue(false);
    render(<AdminDialog />);

    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const submitButton = screen.getByText('Үүсгэх');
    await userEvent.click(submitButton);

    expect(validateForm).toHaveBeenCalledWith(defaultFormData, expect.any(Function));
    expect(showToasts).toHaveBeenCalledWith(false);
    const { handleSubmit } = useConcertForm();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('closes dialog after successful submission', async () => {
    render(<AdminDialog />);

    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const submitButton = screen.getByText('Үүсгэх');
    await userEvent.click(submitButton);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('data-open', 'false');
  });

  it('updates errors state when validation fails', async () => {
    const mockErrors = { concertName: 'Required field' };
    (validateForm as jest.Mock).mockImplementation((_, setErrors) => {
      setErrors(mockErrors);
      return false;
    });

    render(<AdminDialog />);

    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const submitButton = screen.getByText('Үүсгэх');
    await userEvent.click(submitButton);

    const formSection = screen.getByTestId('form-section');
    expect(formSection).toHaveAttribute('data-errors', JSON.stringify(mockErrors));
  });

  it('prevents default form submission', async () => {
    const user = userEvent.setup();
    render(<AdminDialog />);

    const triggerButton = screen.getByTestId('dialog-trigger');
    await user.click(triggerButton);

    const form = screen.getByTestId('admin-form');

    const preventDefaultSpy = jest.fn();
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(submitEvent, 'preventDefault', {
      value: preventDefaultSpy,
    });

    fireEvent(form, submitEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('maintains dialog state when validation fails', async () => {
    (validateForm as jest.Mock).mockReturnValue(false);
    render(<AdminDialog />);

    const triggerButton = screen.getByTestId('dialog-trigger');
    await userEvent.click(triggerButton);

    const form = screen.getByTestId('admin-form');
    await fireEvent.submit(form);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
  });
});
