import AddTicketDialog from '@/app/admin/ticket/_components/AddTicketDialog';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render add ticket dialog component', () => {
  it('should render add ticket dialog component', async () => {
    render(<AddTicketDialog />);

    expect(screen.getByText('Тасалбар нэмэх')).toBeInTheDocument();
  });
});
