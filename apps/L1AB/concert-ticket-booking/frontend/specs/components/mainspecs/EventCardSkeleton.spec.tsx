import { EventCardSkeleton } from '@/components';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('EventCardSkeleton', () => {
  it('should render successfully', async () => {
    render(<EventCardSkeleton />);
  });
});
