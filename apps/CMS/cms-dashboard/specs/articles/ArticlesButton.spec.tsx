import { ArticlesButton } from '../../src/app/articles/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Articles', () => {
  it('Should render articles button component', () => {
    const { container } = render(<ArticlesButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
