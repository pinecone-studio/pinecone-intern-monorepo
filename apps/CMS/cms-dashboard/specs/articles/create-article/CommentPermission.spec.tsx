import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CommentPermission from '../../../../cms-dashboard/src/app/articles/_components/create-article/CommentPermission';

describe('Create Article CommentPermission Component', () => {
  it('1. Should render the correct props', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<CommentPermission commentPermission={true} setCommentPermission={mockFunction} />);
    const switchBtn = getByTestId('commentPermission');
    const headerText = getByTestId('comment-header-text');
    expect(switchBtn).toBeDefined();
    expect(headerText.textContent).toMatch('Сэтгэгдэл идэвхтэй');
  });

  it('2. CommentPermission button clicked', async () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<CommentPermission commentPermission={true} setCommentPermission={mockFunction} />);
    const switchBtn = getByTestId('commentPermission');
    fireEvent.click(switchBtn);
  });
});
