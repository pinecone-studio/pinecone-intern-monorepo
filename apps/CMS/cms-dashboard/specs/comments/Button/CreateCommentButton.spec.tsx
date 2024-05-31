import { render } from '@testing-library/react';
import CreateCommentButton from '@/app/comments/_components/Button/CreateCommentButton';

describe('CreateCommentButton component', () => {
  it('renders CreateCommentButton', () => {
    const { getByTestId } = render(<CreateCommentButton />);
    const addButton = getByTestId('create-comment-button-test-id');
    expect(addButton).toBeDefined();
  });
});
