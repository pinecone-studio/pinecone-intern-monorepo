import NoPostsYet from '@/components/home-post/NoPostsYet';
import { render } from '@testing-library/react';

describe('No posts', () => {
  it('should render no posts', () => {
    render(<NoPostsYet />);
  });
});
