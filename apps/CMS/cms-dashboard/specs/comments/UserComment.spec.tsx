import React from 'react';
import { render } from '@testing-library/react';
import UserCommentCard from '@/app/comments/_components/UserCommentCard';

describe('UserCommentCard', () => {
  it('1.Should render UserCommentCard components', () => {
    const { container } = render(<UserCommentCard />);
    expect(container).toBeDefined();
  });
});
