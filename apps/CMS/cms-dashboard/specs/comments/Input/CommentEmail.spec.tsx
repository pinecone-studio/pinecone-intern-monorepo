import CommentEmail from '@/app/comments/_components/Input/CommentEmail';
import { render } from '@testing-library/react';

describe('CommentEmail component', () => {
  it('renders description correctly', () => {
    const email = 'This is a test title.';
    const { getByTestId } = render(<CommentEmail email={email} />);
    const emailElement = getByTestId('comment-email-test-id');
    expect(emailElement.textContent).toBe(email);
  });
});
