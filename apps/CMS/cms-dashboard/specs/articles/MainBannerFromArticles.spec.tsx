import React from 'react';
import { render } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';

describe('MainBannerFromArticles', () =>
  it('should have correct props', () => {
    const { container } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" />);
    expect(container).toBeDefined()
  }));
