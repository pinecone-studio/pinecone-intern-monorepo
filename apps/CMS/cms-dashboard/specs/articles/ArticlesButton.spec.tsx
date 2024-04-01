import React from 'react';
import { render } from '@testing-library/react';
import { ArticlesButton } from '../../src/app/articles/_components/ArticlesButton';

describe('AssessmentButton', () => {
  it('Should render assessment button component', () => {
    const { container } = render(<ArticlesButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
