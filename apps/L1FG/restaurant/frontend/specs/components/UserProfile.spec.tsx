
import UserProfile from '@/components/user-profile/UserProfile';
import { render } from '@testing-library/react';

describe('UserProfile', () => {
  it('user successfull', async () => {
    render(<UserProfile  />);
  });
});



