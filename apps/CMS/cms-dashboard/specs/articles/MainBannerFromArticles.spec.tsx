import React from 'react';
import { render } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';

describe('MainBannerFromArticles', () =>
  it('should have correct props', () => {
    const { getByTestId } = render(
      <MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="https://getwallpapers.com/wallpaper/full/2/6/e/1179758-cool-cat-hd-wallpapers-1080p-1920x1080.jpg" />
    );

    const articlesTitle = getByTestId('articlesTitle');
    expect(articlesTitle.textContent).toMatch('Welcome');

    const date = getByTestId('date');
    expect(date.textContent).toMatch('2024.04.12');

    const categories = getByTestId('categories');
    expect(categories.textContent).toMatch('Coding');

    const cover = getByTestId('cover');
    expect(cover.getAttribute('src')).toContain('https%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2F2%2F6%2Fe%2F1179758-cool-cat-hd-wallpapers-1080p-1920x1080.jpg&w=3840&q=75');
  }));
