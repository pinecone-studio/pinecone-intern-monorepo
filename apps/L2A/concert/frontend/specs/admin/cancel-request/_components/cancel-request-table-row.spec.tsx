import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow from '@/app/admin/cancel-request/_components/TableRow';

describe('TableRow', () => {
  const mockRequest = {
    id: '1',
    concert: { title: 'Хайртай аав' },
    accountNumber: '123456789',
    bankOwnerName: 'Алтангэрэл',
    ticket: { totalPrice: 182000 },
    createdAt: String(Date.now()),
    status: 'FINISHED',
  };

  it('renders finished request properly', () => {
    render(<TableRow request={mockRequest} />);
    expect(screen.getByText('Хайртай аав')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('Алтангэрэл')).toBeInTheDocument();
    expect(screen.getByText('182000')).toBeInTheDocument();
    expect(screen.getByText('Шилжүүлсэн')).toBeInTheDocument();
  });

  it('renders pending request with "Дуусгах" button', () => {
    render(<TableRow request={{ ...mockRequest, status: 'PENDING' }} />);
    const button = screen.getByRole('button', { name: 'Дуусгах' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
