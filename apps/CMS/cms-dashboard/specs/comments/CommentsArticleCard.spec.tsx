import React from 'react';
import { render } from '@testing-library/react';
import CommentsArticleCard from '../../src/app/comments/_components/CommentsArticleCard';

describe('CommentsArticleCard', () => {
  it('1.Should render commentsArticleCard components', () => {
    const { container } = render(<CommentsArticleCard />);
    expect(container).toBeDefined();
  });
});
