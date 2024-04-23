import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../../src/app/articles/_components/ArticleCard';
import '@testing-library/jest-dom';

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { container } = render(<ArticleCard date="2024.04.16" title="Morphosis" category="Coding" description="It is just description" cover="/Academy.svg" />);
    expect(container).toBeDefined();

    const date = getByTestId('article-date');
    expect(date).toBeDefined();

    const title = getByTestId('article-title');
    expect(title).toBeDefined();

    const category = getByTestId('article-category');
    expect(category).toBeDefined();

    const description = getByTestId('article-description');
    expect(description).toBeDefined();

    const cover = getByTestId('article-cover');
    expect(cover).toBeDefined();
  
  });
});
