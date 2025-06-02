import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow from '@/app/admin/cancel-request/_components/TableRow';

describe('TableRow', () => {
  const mockRequest = {
    id: '1',
    concert: { title: 'Хайртай аав' },
    user: { email: 'altangerel@example.com' },
    ticket: { totalPrice: 182000 },
    createdAt: String(Date.now()),
    status: 'FINISHED',
  };

  it('renders finished request properly', () => {
    render(<TableRow request={mockRequest} />);
    expect(screen.getByText('Хайртай аав')).toBeInTheDocument();
    expect(screen.getByText('altangerel@example.com')).toBeInTheDocument();
    expect(screen.getByText('182000')).toBeInTheDocument();
    expect(screen.getByText(/shiljuulsen/i)).toBeInTheDocument();
  });

  it('renders pending request with Duusgah button', () => {
    render(<TableRow request={{ ...mockRequest, status: 'PENDING' }} />);
    const button = screen.getByText('Duusgah');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
});
