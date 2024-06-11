import { CommentsButton } from '../../src/app/comments/_components';
import React from 'react';
import { render } from '@testing-library/react';

describe('Comments Button', () => {
  it('Should render comments button component', () => {
    const { container } = render(<CommentsButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
