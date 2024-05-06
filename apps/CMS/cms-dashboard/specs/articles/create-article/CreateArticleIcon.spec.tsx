import CreateArticleIcon from '../../../src/app/articles/_components/icons/CreateArticleIcon';
import { render } from '@testing-library/react';

describe('CreateArticle Icon', () => {
  it('1. Should render CreateArticle icon', () => {
    const { getByTestId } = render(<CreateArticleIcon />);
    const buttonElement = getByTestId('create-article-icon');
    expect(buttonElement).toBeDefined();
  });
});
