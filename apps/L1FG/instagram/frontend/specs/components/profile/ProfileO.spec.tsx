import Profile from '@/components/profile/Profile';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<Profile />);
  });
});
