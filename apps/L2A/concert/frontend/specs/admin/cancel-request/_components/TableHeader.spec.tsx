import TableHeader from '@/app/admin/cancel-request/_components/TableHeader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render table', () => {
  it('should render table header', async () => {
    render(<TableHeader />);

    expect(screen.getByText('Дансны мэдээлэл')).toBeInTheDocument();
  });
});
