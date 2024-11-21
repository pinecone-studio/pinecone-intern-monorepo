import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UserProfile } from '@/components/main';



describe('Main User Profile', () => {
  it('should render the main user profile', () => {
    render(<UserProfile />);
  });
});
