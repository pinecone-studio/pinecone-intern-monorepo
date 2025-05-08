import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableSemiHeader from '@/app/admin/table/_features/AdminTableSemiHeader';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useAddTableMutation: () => [
    jest.fn(() =>
      Promise.resolve({
        data: {
          addTable: { _id: '12345' },
        },
      })
    ),
  ],
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(() => Promise.resolve('data:image/png;base64,fakeqr')),
}));

describe('TableSemiHeader', () => {
  it('renders header and add table button', () => {
    render(<TableSemiHeader />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Ширээ');
    expect(screen.getByTestId('add-table-button')).toBeInTheDocument();
  });

  it('opens and closes dialog properly', () => {
    render(<TableSemiHeader />);
    const trigger = screen.getByTestId('add-table-button');
    fireEvent.click(trigger);
    expect(screen.getByTestId('dialog-content')).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  });

  it('shows error toast when input is empty', async () => {
    render(<TableSemiHeader />);
    fireEvent.click(screen.getByTestId('add-table-button'));
    fireEvent.click(screen.getByTestId('create-button'));
    await waitFor(() => {
      expect(screen.getByText('Ширээний нэр хоосон байна')).toBeInTheDocument();
    });
  });

  it('submits table, generates QR code and shows image', async () => {
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
});
