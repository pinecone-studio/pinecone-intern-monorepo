import AuthorComment from '@/app/comments/_components/Input/AuthorComment';
import { render } from '@testing-library/react';

describe('AuthorComment component', () => {
  it('renders description correctly', () => {
    const comment = 'This is a test comment.';
    const { getByTestId } = render(<AuthorComment comment={comment} />);
    const commentElement = getByTestId('comment-test-id');
    expect(commentElement.textContent).toBe(comment);
  });
});
