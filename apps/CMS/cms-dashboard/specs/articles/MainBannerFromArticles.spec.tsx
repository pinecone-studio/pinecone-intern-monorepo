import React from 'react';
import { render } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';

describe('MainBannerFromArticles', () =>
  it('should have correct props', () => {
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" />);

    const articlesTitle = getByTestId('articlesTitle');
    expect(articlesTitle.textContent).toMatch('Welcome');

    const date = getByTestId('date');
    expect(date.textContent).toMatch('2024.04.12');

    const categories = getByTestId('categories');
    expect(categories.textContent).toMatch('Coding');

    const cover = getByTestId('cover');
    expect(cover.getAttribute('src')).toContain('/Academy.svg');
  }));
