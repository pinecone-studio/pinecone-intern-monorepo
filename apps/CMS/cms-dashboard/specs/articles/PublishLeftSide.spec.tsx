import React from 'react';
import { render, screen } from '@testing-library/react';
import PublishLeftSide from '../../src/app/articles/_components/PublishLeftSide';

describe('PublishLeftSide', () => {
  it('1. Should render PublishleftSide component', () => {
    const {container} = render (<PublishLeftSide/>);
    expect(container).toBeDefined();
  });
//   it('2. renders with placeholder text title textfield', () => {
//     render(<PublishLeftSide />);
//     const titleInput = screen.getByPlaceholderText('Энд гарчгаа бичнэ үү...');
//     expect(titleInput).toBeDefined();
// });

});
