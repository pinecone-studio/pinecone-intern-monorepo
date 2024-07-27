import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import ArticleCard from '@/app/articles/_components/ArticleCard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<ArticleCard date="2024.04.16" title="Morphosis" category="Coding" content="It is just description" coverPhoto="/Academy.svg" _id="663097b58073930529faddfc" />);

    const el = getByTestId('article-card');

    act(() => {
      fireEvent.click(el);
    });
  });
});
