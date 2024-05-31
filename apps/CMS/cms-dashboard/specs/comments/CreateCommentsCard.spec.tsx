import React from 'react';
import { render } from '@testing-library/react';
import CreateCommentCard from '@/app/comments/_features/CreateCommentCard';

describe('CreateCommentsCard', () => {
  it('1.Should render CreateCommentsCard components', () => {
    const { container } = render(<CreateCommentCard />);
    expect(container).toBeDefined();
  });
});
