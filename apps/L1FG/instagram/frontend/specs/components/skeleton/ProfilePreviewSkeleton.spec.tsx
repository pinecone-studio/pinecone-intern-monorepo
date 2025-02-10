import { ProfilePreviewSkeleton } from '@/components/skeleton/ProfilePreviewSkeleton';
import { render } from '@testing-library/react';

describe('Profile preview skeleton', () => {
  it('SHould render', () => {
    render(<ProfilePreviewSkeleton />);
  });
});
