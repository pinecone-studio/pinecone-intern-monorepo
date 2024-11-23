import { render } from '@testing-library/react';
import { FollowersDialogRemove } from '@/components/FollowersDialogRemove';

describe('FollowersDialogRemove', () => {
  const defaultProps = {
    name: 'test',
    img: '/avatar.jpg',
    fullname: 'test',
    suggest: 'blabla',
  };

  it('renders all components correctly', () => {
    render(<FollowersDialogRemove {...defaultProps} />);
  });
});
