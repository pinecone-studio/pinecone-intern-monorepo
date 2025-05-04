import { render, screen, fireEvent } from '@testing-library/react';
import AdminTableList from '@/app/admin/table/_features/AdminTableList';
import '@testing-library/jest-dom';

describe('AdminTableList', () => {
  it('renders all classrooms', () => {
    expect(screen.queryByTestId('classroom-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('classroom-2')).not.toBeInTheDocument();

    render(<AdminTableList />);

    expect(screen.getByTestId('classroom-1')).toBeInTheDocument();
    expect(screen.getByTestId('classroom-2')).toBeInTheDocument();
  });

  it('renders classroom names', () => {
    render(<AdminTableList />);
    expect(screen.getByTestId('classroom-name-1')).toHaveTextContent('1A');
    expect(screen.getByTestId('classroom-name-2')).toHaveTextContent('1b');
  });

  it('clicks QR, edit, and delete buttons', () => {
    render(<AdminTableList />);

    const qrBtn = screen.getByTestId('qr-btn-1');
    const editBtn = screen.getByTestId('edit-btn-1');
    const deleteBtn = screen.getByTestId('delete-btn-1');

    fireEvent.click(qrBtn);
    fireEvent.click(editBtn);
    fireEvent.click(deleteBtn);
    expect(qrBtn).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });
});
