import { render } from '@testing-library/react';
import EditCommentButton from '@/app/comments/_components/Button/EditCommentButton';

describe('EditCommentButton component', () => {
  it('renders EditCommentButton', () => {
    const { getByTestId } = render(<EditCommentButton />);
    const editButton = getByTestId('edit-comment-button-test-id');
    expect(editButton).toBeDefined();
  });
});
