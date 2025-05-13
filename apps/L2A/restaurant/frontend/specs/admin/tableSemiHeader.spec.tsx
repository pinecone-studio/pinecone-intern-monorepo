import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableSemiHeader from '@/app/admin/table/_features/AdminTableSemiHeader';
import { useAddTableMutation } from '@/generated';
import QRCode from 'qrcode';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useAddTableMutation: jest.fn(),
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
}));

describe('TableSemiHeader', () => {
  const mockAddTableMutation = jest.fn();

  beforeEach(() => {
    (useAddTableMutation as jest.Mock).mockReturnValue([mockAddTableMutation]);
    (QRCode.toDataURL as jest.Mock).mockReset();
    mockAddTableMutation.mockReset();
  });

  it('renders header and add button', () => {
    render(<TableSemiHeader />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Ширээ');
    expect(screen.getByTestId('add-table-button')).toBeInTheDocument();
  });

  it('opens and closes the dialog', async () => {
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Ширээ нэмэх');
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
    });
  });

  it('shows error toast when trying to create with empty input', async () => {
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));

    await act(async () => {
      fireEvent.click(screen.getByTestId('create-button'));
    });

    await waitFor(() => {
      expect(screen.getByText('Ширээний нэр хоосон байна')).toBeInTheDocument();
    });
  });
  it('successfully creates a table and shows QR code', async () => {
    mockAddTableMutation.mockResolvedValue({
      data: {
        addTable: { _id: '12345' },
      },
    });
  
    (QRCode.toDataURL as jest.Mock).mockResolvedValue(
      'data:image/png;base64,mockedbase64string'
    );
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    const input = screen.getByTestId('table-name-input');
    fireEvent.change(input, { target: { value: 'Test Table' } });
    await act(async () => {
      fireEvent.click(screen.getByTestId('create-button'));
    });
    await waitFor(() => {
      expect(screen.getByTestId('qr-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('qr-image')).toHaveAttribute(
        'src',
        'data:image/png;base64,mockedbase64string'
      );
      expect(screen.getByTestId('qr-download-link')).toHaveAttribute(
        'href',
        'data:image/png;base64,mockedbase64string'
      );
    });
    expect(screen.getByText('Ширээ амжилттай нэмэгдлээ!')).toBeInTheDocument();
  });
  
  it('shows error toast if QR code generation fails', async () => {
    mockAddTableMutation.mockResolvedValue({
      data: {
        addTable: { _id: '12345' },
      },
    });
    (QRCode.toDataURL as jest.Mock).mockRejectedValue(new Error('QR error'));
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    const input = screen.getByTestId('table-name-input');
    fireEvent.change(input, { target: { value: 'Test Table' } });
    await act(async () => {
      fireEvent.click(screen.getByTestId('create-button'));
    });
    await waitFor(() => {
      expect(screen.getByText('QR код үүсгэхэд алдаа гарлаа.')).toBeInTheDocument();
    });
  });

  it('shows error toast if GraphQL mutation fails', async () => {
    mockAddTableMutation.mockRejectedValue(new Error('GraphQL error'));
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    const input = screen.getByTestId('table-name-input');
    fireEvent.change(input, { target: { value: 'Test Table' } });
    await act(async () => {
      fireEvent.click(screen.getByTestId('create-button'));
    });
    await waitFor(() => {
      expect(screen.getByText('Серверийн алдаа. Дахин оролдоно уу.')).toBeInTheDocument();
    });
  });

  it('shows error toast if no ID returned from GraphQL', async () => {
    mockAddTableMutation.mockResolvedValue({
      data: {
        addTable: null,
      },
    });
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    const input = screen.getByTestId('table-name-input');
    fireEvent.change(input, { target: { value: 'Test Table' } });
    await act(async () => {
      fireEvent.click(screen.getByTestId('create-button'));
    });
    await waitFor(() => {
      expect(screen.getByText('Ширээ үүсгэхэд алдаа гарлаа.')).toBeInTheDocument();
    });
  });
});
