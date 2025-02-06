import { LikedPost } from '@/components/notifications/LikedPost';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<LikedPost />);
  });
});
