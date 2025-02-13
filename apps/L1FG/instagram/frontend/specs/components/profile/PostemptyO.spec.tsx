import PostEmpty from '@/components/profile/profilePost/PostEmpty';
import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

describe('PostEmpty', () => {
  it('Should render', () => {
    render(<PostEmpty />);
    fireEvent.click(screen.getByTestId('post-empty-button'));
    expect(screen.getByTestId('create-post-modal')).toBeDefined();
  });
});
