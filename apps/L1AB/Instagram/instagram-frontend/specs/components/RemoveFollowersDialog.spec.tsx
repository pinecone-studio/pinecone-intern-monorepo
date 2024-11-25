import { render } from '@testing-library/react';
import { RemoveFollowersDialog } from '@/components/RemoveFollowersDialog';
describe('RemoveFollowersDialog', () => {
  const defaultProps = {
    img: '/test-avatar.jpg',
  };

  it('renders the trigger button with correct styling', () => {
    render(<RemoveFollowersDialog {...defaultProps} />);
  });
});
