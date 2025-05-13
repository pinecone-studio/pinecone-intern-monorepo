import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableRow, { Request } from '@/app/admin/cancel-request/_components/TableRow';

describe('TableRow', () => {
  it('should render all request fields', () => {
    const mockRequest: Request = {
      id: '1',
      concertName: 'Хайртай аав',
      bankInfo: 'Голомт: 21342242294',
      owner: 'И.Алтангэрэл',
      amount: '182’000₮',
      date: '10/23',
      status: 'шилжүүлсэн',
    };
    render(<TableRow request={mockRequest} />);

    expect(screen.getByText('Хайртай аав')).toBeInTheDocument();
    expect(screen.getByText('Голомт: 21342242294')).toBeInTheDocument();
    expect(screen.getByText('И.Алтангэрэл')).toBeInTheDocument();
    expect(screen.getByText('182’000₮')).toBeInTheDocument();
    expect(screen.getByText('10/23')).toBeInTheDocument();
    expect(screen.getByText('шилжүүлсэн')).toBeInTheDocument();
  });

  it('should render all request fields', () => {
    const mockRequest: Request = {
      id: '1',
      concertName: 'Хайртай аав',
      bankInfo: 'Голомт: 21342242294',
      owner: 'И.Алтангэрэл',
      amount: '182’000₮',
      date: '10/23',
      status: 'дуусгах',
    };
    render(<TableRow request={mockRequest} />);

    expect(screen.getByText('Хайртай аав')).toBeInTheDocument();
    expect(screen.getByText('Голомт: 21342242294')).toBeInTheDocument();
    expect(screen.getByText('И.Алтангэрэл')).toBeInTheDocument();
    expect(screen.getByText('182’000₮')).toBeInTheDocument();
    expect(screen.getByText('10/23')).toBeInTheDocument();
    const button = screen.getByText('дуусгах');
    expect(screen.getByText('дуусгах')).toBeInTheDocument();
    fireEvent.click(button);
  });
});
