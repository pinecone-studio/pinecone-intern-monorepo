import { LeaveCalendar } from '@/components/LeaveCalendar';
import { render, screen } from '@testing-library/react';

describe('LeaveCalendar', () => {
  it('renders the component', () => {
    render(<LeaveCalendar />);
    expect(screen.getAllByText('Чөлөө авсан:'));
  });
});
