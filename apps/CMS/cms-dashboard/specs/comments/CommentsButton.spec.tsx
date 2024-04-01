import React from 'react';
import { render } from '@testing-library/react';
import { CommentsButton } from '../../src/app/comments/_components/CommentsButton';
describe('CommentsButton', () => {
  it('Should render profile button component', () => {
    const { container } = render(<CommentsButton text="hello test" />);
    expect(container).toBeDefined();
  });
});
