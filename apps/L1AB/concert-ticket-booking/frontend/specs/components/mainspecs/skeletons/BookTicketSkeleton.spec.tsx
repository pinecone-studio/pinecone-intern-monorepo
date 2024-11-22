import { BookTicketSkeleton } from '@/components/maincomponents/Skeletons/BookTicketSkeleton';
import { render } from '@testing-library/react';

describe('BookTicketSkeleton', () => {
  it('should render BookTicketSkeleton', () => {
    render(<BookTicketSkeleton />);
  });
});
