import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaidLeave } from '@/components/PaidLeave';

describe('PaidLeave Component', () => {
  it('renders the component', () => {
    render(<PaidLeave availablePaidDays={123} totalPaidLeaveDays={123} />);

    const leaveInfoText = 'Цалинтай чөлөө';
    expect(screen.getByText(leaveInfoText)).toBeInTheDocument();
  });
});
