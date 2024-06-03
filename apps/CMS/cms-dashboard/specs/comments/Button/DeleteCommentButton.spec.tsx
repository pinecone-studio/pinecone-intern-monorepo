import DeleteCommentButton from '@/app/comments/_components/Button/DeleteCommentButton';
import { render } from '@testing-library/react';

describe('DeleteButton component', () => {
  it('renders DeleteButton', () => {
    const { getByTestId } = render(<DeleteCommentButton />);
    const backButton = getByTestId('delete-comment-button-test-id');
    expect(backButton).toBeDefined();
  });
});
