import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../../src/app/articles/_components/ArticleCard';

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getAllByTestId,container } = render(<ArticleCard date="2024.04.16" title="Morphosis" category="Coding" description="It is just description" cover="/Academy.svg" />);
    expect(container).toBeDefined();

  });
});
