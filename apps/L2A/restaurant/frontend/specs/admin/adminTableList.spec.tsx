import { render, screen, fireEvent } from '@testing-library/react';
import AdminTableList from '@/app/admin/table/_features/AdminTableList';
import '@testing-library/jest-dom';

describe('AdminTableList', () => {
  it('renders all tables', () => {
    expect(screen.queryByTestId('classroom-row-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('classroom-row-2')).not.toBeInTheDocument();
    render(<AdminTableList />);
    expect(screen.getByTestId('classroom-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('classroom-row-2')).toBeInTheDocument();
  });
  it('renders table names', () => {
    render(<AdminTableList />);
    expect(screen.getByTestId('classroom-name-1')).toHaveTextContent('1A');
    expect(screen.getByTestId('classroom-name-2')).toHaveTextContent('1B');
  });
  it('clicks QR, edit, and delete buttons', () => {
    render(<AdminTableList />);
    const qrBtn = screen.getByTestId('classroom-1-qr-button');
    const editBtn = screen.getByTestId('classroom-1-edit-button');
    const deleteBtn = screen.getByTestId('classroom-1-delete-button');
    fireEvent.click(qrBtn);
    fireEvent.click(editBtn);
    fireEvent.click(deleteBtn);
    expect(qrBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });
  it('opens update dialog and updates input value', () => {
    render(<AdminTableList />);
    const editBtn = screen.getByTestId('classroom-1-edit-button');
    fireEvent.click(editBtn);
    const dialog = screen.getByTestId('classroom-1-dialog');
    expect(dialog).toBeInTheDocument();
    const input = screen.getByTestId('classroom-1-input');
    fireEvent.change(input, { target: { value: 'Updated Name' } });
    expect(input).toHaveValue('Updated Name');
    const updateBtn = screen.getByTestId('classroom-1-update-button');
    fireEvent.click(updateBtn);
    expect(updateBtn).toBeInTheDocument();
  });
});
