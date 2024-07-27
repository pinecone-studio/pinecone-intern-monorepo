import { render } from '@testing-library/react';
import ArticleEditButton from '../../src/app/dashboard/_components/ArticleEditButton';

describe('Article edit button', () => {
  it('1. Should render article edit button component', () => {
    const { getByTestId } = render(<ArticleEditButton id="1" />);
    const buttonElement = getByTestId('article-edit-button-test-id');
    expect(buttonElement).toBeDefined();
  });
});
