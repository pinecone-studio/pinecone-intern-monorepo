import { HeaderProfile } from '@/features/user/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HeaderProfile', () => {
  it('should render Booked successfully', async () => {
    render(<HeaderProfile />);
  });
});
