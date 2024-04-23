import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../../src/app/articles/_components/ArticleCard';

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<ArticleCard date="2024.04.16" title="Morphosis" category="Coding" description="It is just description" cover="/Academy.svg" />);

    const date = getByTestId('article-date');
    expect(date.textContent).toMatch('2024.04.16');

    const title = getByTestId('article-title');
    expect(title.textContent).toMatch('Morphosis');

    const category = getByTestId('article-category');
    expect(category.textContent).toMatch('Coding');

    const description = getByTestId('article-description');
    expect(description.textContent).toMatch('It is just description');

    const cover = getByTestId('article-cover');
    expect(cover.getAttribute('src')).toContain('/Academy.svg');
  });
});
