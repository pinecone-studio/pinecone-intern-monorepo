import React from 'react';
import { render } from '@testing-library/react';
import CommentsArticleCard from '../../src/app/comments/_components/CreateCommentsCard';

describe('CreateCommentsCard', () => {
  it('1.Should render CreateCommentsCard components', () => {
    const { container } = render(<CommentsArticleCard />);
    expect(container).toBeDefined();
  });
});
