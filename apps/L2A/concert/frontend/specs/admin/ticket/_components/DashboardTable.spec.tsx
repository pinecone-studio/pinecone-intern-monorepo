import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardTable from '@/app/admin/ticket/_components/DashboardTable';

describe('DashboardTable', () => {
  test('should renders table with correct headers', () => {
    render(<DashboardTable />);

    expect(screen.getByText('Онцлох')).toBeInTheDocument();
    expect(screen.getByText('Тоглолтын нэр')).toBeInTheDocument();
    expect(screen.getByText('Артист')).toBeInTheDocument();
    expect(screen.getByText(/Нийт тоо/i)).toBeInTheDocument();
    expect(screen.getByText(/VIP/i)).toBeInTheDocument();
    expect(screen.getByText(/Regular/i)).toBeInTheDocument();
    expect(screen.getByText(/Задгай/i)).toBeInTheDocument();
    expect(screen.getByText('Тоглох өдрүүд')).toBeInTheDocument();
    expect(screen.getByText('Нийт ашиг')).toBeInTheDocument();
    expect(screen.getByText('Үйлдэл')).toBeInTheDocument();
  });
});
