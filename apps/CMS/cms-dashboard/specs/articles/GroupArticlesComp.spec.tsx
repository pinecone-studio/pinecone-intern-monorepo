import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GroupArticlesComp from '../../src/app/articles/_components/GroupArticlesComp';

describe('GroupArticlesComp', () => {
  it('should  have correct props', () => {
    const { getByTestId } = render(<GroupArticlesComp title="Morphosis" />);

    const clickHandler = jest.fn();

    const title = getByTestId('group-title');
    expect(title.textContent).toMatch('Morphosis');

    fireEvent.click(getByTestId('group-icon-button'));
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});
