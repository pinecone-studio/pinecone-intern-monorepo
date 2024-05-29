import React from 'react';
import { render } from '@testing-library/react';
import UserComment from '../../src/app/comments/_features/UserComment';

describe('UserCommentCard', () => {
  it('1.Should render UserCommentCard components', () => {
    const { container } = render(<UserComment />);
    expect(container).toBeDefined();
  });
});
