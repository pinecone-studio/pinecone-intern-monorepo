import CreateArticleIcon from '../../../src/assets/icons/CreateArticleIcon';
import { render } from '@testing-library/react';

describe('CreateArticle Icon', () => {
  it('1. Should render CreateArticle icon', () => {
    const { getByTestId } = render(<CreateArticleIcon />);
    const buttonElement = getByTestId('create-article-icon');
    expect(buttonElement).toBeDefined();
  });
});
