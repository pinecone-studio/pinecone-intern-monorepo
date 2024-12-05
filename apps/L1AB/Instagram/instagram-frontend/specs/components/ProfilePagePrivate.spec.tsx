import ProfilePagePrivate from '@/components/ProfilePagePrivate';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ProfilePagePrivate', () => {
  it('should render successfully', async () => {
    render(<ProfilePagePrivate />);
  });
});
