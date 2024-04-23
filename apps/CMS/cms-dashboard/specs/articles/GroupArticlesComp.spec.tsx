import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GroupArticlesComp from '../../src/app/articles/_components/GroupArticlesComp';

describe('GroupArticlesComp', () => {
  it('should  have correct props', () => {
    const { getByTestId } = render(<GroupArticlesComp title="Morphosis" categoryId='hi' />);

    const clickHandler = jest.fn();

    const title = getByTestId('group-title');
    expect(title.textContent).match('Morphosis');

    fireEvent.click(getByTestId('group-icon-button'));
    expect(clickHandler).toBeDefined();
  });
});
