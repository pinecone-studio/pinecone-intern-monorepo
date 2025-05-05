import AdminListingTable from '@/app/admin/_components/AdminListingTable';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, within } from '@testing-library/react';

describe('AdminListingTable - Filter Logic', () => {
  it('filters listings when a tab is clicked', () => {
    render(<AdminListingTable />);

    fireEvent.click(screen.getByText('Зөвшөөрсөн'));

    const firstRow = screen.getByText('0002').closest('tr');
    expect(firstRow).toBeInTheDocument();

    const rowContent = within(firstRow!);
    expect(rowContent.getByText('Seoul royal county хотхон')).toBeInTheDocument();
    expect(rowContent.getByText('Н.Мөнхтунгалаг')).toBeInTheDocument();
  });
});
