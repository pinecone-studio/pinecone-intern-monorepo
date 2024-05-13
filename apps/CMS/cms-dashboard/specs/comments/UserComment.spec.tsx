import React from 'react';
import { render } from '@testing-library/react';
import UserComment from '@/app/comments/_components/UserComment';

describe('UserCommentCard', () => {
  it('1.Should render UserCommentCard components', () => {
    const { container } = render(<UserComment />);
    expect(container).toBeDefined();
  });
});
