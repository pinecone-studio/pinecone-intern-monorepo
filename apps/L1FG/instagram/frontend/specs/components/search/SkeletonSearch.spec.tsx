import { SearchSkeleton } from '@/components/search/SkeletonSearch';
import { render } from '@testing-library/react';

describe('Profile preview skeleton', () => {
  it('SHould render', () => {
    render(<SearchSkeleton />);
  });
});
