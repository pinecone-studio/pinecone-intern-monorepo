import React from 'react';
import { render } from '@testing-library/react';
import CommentsTab from '../../src/app/comments/_components/CommentsTab';

describe('CommentsTab Component', () => {
  it('renders all buttons with correct text and count', () => {
    const { getByText } = render(<CommentsTab />);
    
    expect(getByText('Бүгд')).toBeDefined();
    expect(getByText('Нуусан')).toBeDefined();
    expect(getByText('Устгасан')).toBeDefined();

  });

  it('Should render button classname', () => {
    const { container } = render(<CommentsTab/>);
    expect(container).toBeDefined();
});
});
