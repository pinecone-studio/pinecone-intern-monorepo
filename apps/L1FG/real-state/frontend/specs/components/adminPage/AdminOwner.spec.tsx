import { AdminOwnerPost } from '@/components/adminPage/AdminOwnerPosts';
import { render } from '@testing-library/react';

describe('Admin Owner Tests', () => {
  it('should render AdminOwner', () => {
    render(<AdminOwnerPost />);
  });
});
