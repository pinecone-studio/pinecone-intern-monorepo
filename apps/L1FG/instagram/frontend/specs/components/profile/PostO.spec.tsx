import Post from '@/components/profile/Post';

import { render, screen } from '@testing-library/react';

describe('Post', () => {
  it('Should render', () => {
    render(<Post />);
    expect(screen.getByTestId('profile-post')).toBeDefined();
  });
});
