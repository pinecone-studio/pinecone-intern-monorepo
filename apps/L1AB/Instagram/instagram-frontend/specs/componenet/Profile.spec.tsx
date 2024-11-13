import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Profile } from '@/components/Profile';

describe('Profile', () => {
  it('should render successfully', async () => {
    render(<Profile />);
  });
});
