import React from 'react';
import { render } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';

describe('MainBannerFromArticles', () =>
  it('should have correct props', () => {
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" ArticlesTitle="Welcome" categories="Coding" />);

    // const articlesCover = getByTestId('articlesCover');
    // expect(articlesCover.textContent).toMatch('https://hdqwalls.com/wallpapers/earth-space-hd.jpg');

    const articlesTitle = getByTestId('articlesTitle');
    expect(articlesTitle.textContent).toMatch('Welcome');

    const date = getByTestId('date');
    expect(date.textContent).toMatch('2024.04.12');

    const categories = getByTestId('categories');
    expect(categories.textContent).toMatch('Coding');
  }));
