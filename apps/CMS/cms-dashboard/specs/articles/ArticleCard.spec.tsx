import React from 'react';
import { render } from '@testing-library/react';
import ArticleCard from '../../src/app/articles/_components/ArticleCard';

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(
      <ArticleCard
        date="2024.04.15"
        title="Morphosis"
        category="Coding"
        description="It is just description"
        cover="https://getwallpapers.com/wallpaper/full/2/6/e/1179758-cool-cat-hd-wallpapers-1080p-1920x1080.jpg"
      />
    );

    const date = getByTestId('date');
    expect(date.textContent).toMatch('2024.04.15');

    const title = getByTestId('title');
    expect(title.textContent).toMatch('Morphosis');

    const category = getByTestId('category');
    expect(category.textContent).toMatch('Coding');

    const description = getByTestId('description');
    expect(description.textContent).toMatch('It is just description');

    const cover = getByTestId('cover');
    expect(cover.getAttribute('src')).toContain('https://getwallpapers.com/wallpaper/full/2/6/e/1179758-cool-cat-hd-wallpapers-1080p-1920x1080.jpg');
  });
});
