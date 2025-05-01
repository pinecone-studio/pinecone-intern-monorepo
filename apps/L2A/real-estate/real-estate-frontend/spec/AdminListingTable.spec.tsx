import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import AdminListingTable from '../src/app/admin/_components/AdminListingTable';

describe('AdminListingTable', () => {
  it('renders table heading', () => {
    render(<AdminListingTable />);
    expect(screen.getByText('Зарууд')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Хайлт')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<AdminListingTable />);
    expect(screen.getByText('Хүсэлт илгээсэн')).toBeInTheDocument();
    expect(screen.getByText('Зөвшөөрсөн')).toBeInTheDocument();
    expect(screen.getByText('Татгалзсан')).toBeInTheDocument();
    expect(screen.getByText('Админ хассан')).toBeInTheDocument();
  });

  it('renders a row from mock listing', () => {
    render(<AdminListingTable />);

    const row = screen.getByText('0001').closest('tr');
    if (!row) {
      throw new Error('Row not found');
    }
    const utils = within(row);

    expect(utils.getByText('0001')).toBeInTheDocument();
    expect(utils.getByText('Seoul royal county хотхон')).toBeInTheDocument();
    expect(utils.getByText('Н.Мөнхтунгалаг')).toBeInTheDocument();
    expect(utils.getByText('99112233')).toBeInTheDocument();
  });

  it('renders pagination footer', () => {
    render(<AdminListingTable />);
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });
});
