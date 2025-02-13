import { TitleSecurity } from '@/features/user/profile/TitleSecurity';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('TitleSecurity', () => {
  it('should render Booked successfully', async () => {
    render(<TitleSecurity />);
  });
});
