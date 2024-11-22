import { EventDetailsSkeleton } from '@/components/maincomponents/Skeletons/EventDetailsSkeleton';
import { render } from '@testing-library/react';

describe('EventDetailsSkeleton', () => {
  it('should render EventDetailsSkeleton', () => {
    render(<EventDetailsSkeleton />);
  });
});
