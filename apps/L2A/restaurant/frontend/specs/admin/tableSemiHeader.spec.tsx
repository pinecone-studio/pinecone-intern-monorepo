import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableSemiHeader from '@/app/admin/table/_features/AdminTableSemiHeader';
import '@testing-library/jest-dom';
import * as generated from '@/generated';
import QRCode from 'qrcode';

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useAddTableMutation: jest.fn(),
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
}));

describe('TableSemiHeader', () => {
  let alertMock: jest.SpyInstance;
  let useAddTableMutationMock: jest.Mock;
  let qrCodeMock: jest.Mock;

  beforeEach(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(jest.fn());
    useAddTableMutationMock = generated.useAddTableMutation as jest.Mock;
    qrCodeMock = QRCode.toDataURL as jest.Mock;
    useAddTableMutationMock.mockReturnValue([
      jest.fn().mockResolvedValue({
        data: {
          addTable: {
            _id: '12345',
          },
        },
      }),
    ]);
    qrCodeMock.mockResolvedValue('data:image/png;base64,mockedQRCode');

    render(<TableSemiHeader />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const openDialog = () => fireEvent.click(screen.getByTestId('add-table-button'));

  it('renders header title', () => {
    expect(screen.getByTestId('header-title')).toHaveTextContent('Ширээ');
  });

  it('opens dialog when clicking add table button', () => {
    openDialog();
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });

  it('alerts when clicking create without input', async () => {
    openDialog();
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Ширээний нэр хоосон байна'));
  });

  it('does not alert when input is filled and handles success flow', async () => {
    openDialog();
    const input = screen.getByTestId('table-name-input');
    const createButton = screen.getByTestId('create-button');
    fireEvent.change(input, { target: { value: 'Table 1' } });
    fireEvent.click(createButton);
    await waitFor(() => {
      expect(useAddTableMutationMock).toHaveBeenCalled();
      expect(qrCodeMock).toHaveBeenCalledWith(expect.stringContaining('/table/12345'));
    });
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Амжилттай ширээ нэмэгдлээ!');
    });
  });

  it('renders QR code and download button after successful creation', async () => {
    openDialog();
    const input = screen.getByTestId('table-name-input');
    const createButton = screen.getByTestId('create-button');
    fireEvent.change(input, { target: { value: 'Table 1' } });
    fireEvent.click(createButton);
    await waitFor(() => {
      expect(screen.getByTestId('qr-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('qr-image')).toHaveAttribute('src', 'data:image/png;base64,mockedQRCode');
      expect(screen.getByTestId('qr-download-button')).toBeInTheDocument();
    });
  });
});
