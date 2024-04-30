import { fireEvent, render } from '@testing-library/react';
import CommentPermission from '../../../../cms-dashboard/src/app/articles/_components/create-article/CommentPermission';

describe('Comment Permission Component', () => {
  it('1. Should render commentPermission Mui Switch Component', () => {
    const { getByTestId } = render(<CommentPermission />);
    const switchBtn = getByTestId('commentPermission');
    expect(switchBtn).toBeDefined();
  });
  it('2. Change MuiSwitch button clicked', async () => {
    const { getByTestId } = render(<CommentPermission />);
    const switchBtn = getByTestId('commentPermission');
    fireEvent.click(switchBtn);
  });
});
