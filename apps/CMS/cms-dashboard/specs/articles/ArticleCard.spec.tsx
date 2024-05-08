import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import ArticleCard from '../../src/app/articles/_components/ArticleCard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe('ArticlesCard', () => {
  it('it should render with correct props', () => {
    const { getByTestId } = render(<ArticleCard date="2024.04.16" title="Morphosis" category="Coding" description="It is just description" cover="/Academy.svg" _id='663097b58073930529faddfc' />);

    const el = getByTestId("article-main-container");

    act(() => {
      fireEvent.click(el)
    })


  });
});
