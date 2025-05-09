import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableSemiHeader from '@/app/admin/table/_features/AdminTableSemiHeader';
import '@testing-library/jest-dom';
import * as generated from '@/generated';
import * as QRCode from 'qrcode';

afterEach(() => {
  jest.clearAllMocks();
});
jest.mock('@/generated', () => ({
  useAddTableMutation: jest.fn(),
}));
jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
}));

describe('TableSemiHeader', () => {
  it('renders header and add table button', () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: '12345' } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64,fakeqr');
    render(<TableSemiHeader />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Ширээ');
    expect(screen.getByTestId('add-table-button')).toBeInTheDocument();
  });

  it('opens and closes dialog properly', () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: '12345' } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64,fakeqr');
    render(<TableSemiHeader />);
    const trigger = screen.getByTestId('add-table-button');
    fireEvent.click(trigger);
    expect(screen.getByTestId('dialog-content')).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  });

  it('shows error toast when input is empty', async () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: '12345' } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64,fakeqr');
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes('Ширээний нэр хоосон байна'))
      ).toBeInTheDocument();
    });
  });

  it('submits table, generates QR code and shows image', async () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: '12345' } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64,fakeqr');

    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    const input = screen.getByTestId('table-name-input');
    fireEvent.change(input, { target: { value: 'Test Table' } });
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => {
      expect(screen.getByTestId('qr-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('qr-image')).toHaveAttribute('src', 'data:image/png;base64,fakeqr');
      expect(screen.getByTestId('qr-download-link')).toHaveAttribute('href', 'data:image/png;base64,fakeqr');
    });
  });

  it('shows error toast when GraphQL does not return createdId', async () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: null } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockResolvedValue('data:image/png;base64/fakeqr');
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    fireEvent.change(screen.getByTestId('table-name-input'), { target: { value: 'Test Table' } });
    fireEvent.click(screen.getByTestId('create-button'));
    console.log(
      'GraphQL mock called:',
      (generated.useAddTableMutation as jest.Mock).mock.results[0]?.value
    );
    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes('Ширээ үүсгэхэд алдаа гарлаа.'))
      ).toBeInTheDocument();
    });
  });

  it('shows error toast when QR code generation fails', async () => {
    (generated.useAddTableMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ data: { addTable: { _id: '12345' } } })),
    ]);
    (QRCode.toDataURL as jest.Mock).mockRejectedValue(new Error('QR fail'));
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    fireEvent.change(screen.getByTestId('table-name-input'), { target: { value: 'Test Table' } });
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => {
      expect(
        screen.getByText((text) => text.includes('QR код үүсгэхэд алдаа гарлаа.'))
      ).toBeInTheDocument();
    });
  });
});
