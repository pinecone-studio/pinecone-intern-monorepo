import { UserProfile } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main User Profile', () => {
  it('should render the main user profile', () => {
    render(<UserProfile />);
  });
});
