import TableHeader from '@/app/admin/cancel-request/_components/TableHeader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render add ticket dialog component', () => {
  it('should render add ticket dialog component', async () => {
    render(<TableHeader />);

    expect(screen.getByText('Дансны мэдээлэл')).toBeInTheDocument();
  });
});
