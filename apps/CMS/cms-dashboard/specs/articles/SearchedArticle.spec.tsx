import SearchedArticle from '@/app/articles/_components/article-header/SearchedArticle';
import { act, fireEvent, render } from '@testing-library/react';
import { format } from 'date-fns';

jest.mock('next/navigation', () => ({
  useRouter() {
    return { push: () => jest.fn() };
  },
}));

describe('It should render each searched article', () => {
  it('1.It should take its props', () => {
    const dateProps = new Date();
    const { getByTestId, container } = render(<SearchedArticle title="Morphosis" coverPhoto="image_url" publishedAt={dateProps} id="article_id" />);

    const title = getByTestId('searched-article-title');
    const articleContainer = getByTestId('searched-article-container');

    expect(container).toBeDefined();
    expect(title.textContent).toEqual('Morphosis');

    act(() => {
      fireEvent.click(articleContainer);
    });
  });

  it('2.It should change props date to desired format', () => {
    const dateProps = new Date();
    const finalDate = format(dateProps, 'yyyy.MM.dd');
    const { getByTestId } = render(<SearchedArticle title="Morphosis" coverPhoto="image_url" publishedAt={dateProps} id="article_id" />);

    const date = getByTestId('searched-article-date');
    expect(date.textContent).toEqual(finalDate);
  });
});
