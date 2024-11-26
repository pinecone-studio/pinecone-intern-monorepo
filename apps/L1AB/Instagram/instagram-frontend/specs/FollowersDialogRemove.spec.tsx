import { render } from '@testing-library/react';
import { FollowersDialogRemove } from '@/components/FollowersDialogRemove';

jest.mock('@/components/RemoveFollowersDialog', () => ({
  RemoveFollowersDialog: jest.fn(() => <div>RemoveFollowersDialog</div>),
}));

describe('FollowersDialogRemove', () => {
  const defaultProps = {
    name: 'test1',
    img: '/avatar1.jpg',
    fullname: 'Test One',
    suggest: 'blabla1',
  };

  it('renders correctly with provided props', () => {
    render(<FollowersDialogRemove {...defaultProps} />);
  });
});
