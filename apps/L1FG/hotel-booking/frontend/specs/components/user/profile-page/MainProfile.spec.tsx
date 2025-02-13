import { MainProfile } from '@/features/user/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('MainProfile', () => {
  it('should render Booked successfully', async () => {
    render(<MainProfile />);
  });
});
