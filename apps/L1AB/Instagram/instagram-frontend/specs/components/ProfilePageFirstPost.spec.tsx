import { ProfilePageFirstPost } from '@/components/ProfilePageFirstPost';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ProfilePageFirstPost', () => {
  it('should render successfully', async () => {
    render(<ProfilePageFirstPost />);
  });
});
