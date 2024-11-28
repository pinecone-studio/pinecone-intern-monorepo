import { ProfilePageNoPostYet } from '@/components/ProfilePageNoPostYet';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ProfilePageNoPostYet', () => {
  it('should render successfully', async () => {
    render(<ProfilePageNoPostYet />);
  });
});
