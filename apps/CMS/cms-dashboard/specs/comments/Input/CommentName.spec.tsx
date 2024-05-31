import CommentName from '@/app/comments/_components/Input/CommentName';
import { render } from '@testing-library/react';

describe('CommentName component', () => {
  it('renders description correctly', () => {
    const name = 'This is a test name.';
    const { getByTestId } = render(<CommentName name={name} />);
    const nameElement = getByTestId('comment-name-test-id');
    expect(nameElement.textContent).toBe(name);
  });
});
