import { render } from '@testing-library/react';
import CommentsCard from '../../src/app/comments/_components/AdminCommentsCard';

describe('CommentsCard', () => {
  it('1.Should render commentsCard components', () => {
    const { container } = render(<CommentsCard />);
    expect(container).toBeDefined();
  });
});
