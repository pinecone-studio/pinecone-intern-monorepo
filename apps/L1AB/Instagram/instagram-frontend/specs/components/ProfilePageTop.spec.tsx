import { ProfilePageTop } from '@/components/ProfilePageTop';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ProfilePagePosts', () => {
  it('should render successfully', async () => {
    render(<ProfilePageTop profileImg="https://plus.unsplash.com" profileUsername="test" postCount="2" followersCount="3" followingCount="4" profileFullname="test" description="test" />);
  });
});
