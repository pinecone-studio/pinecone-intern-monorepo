import { TitleContact } from '@/features/user/profile/TitleContact';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('TitleContact', () => {
  it('should render Booked successfully', async () => {
    render(<TitleContact />);
  });
});
