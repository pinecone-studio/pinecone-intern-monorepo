import { TitleImpormation } from '@/features/user/profile';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('TitleImpormation', () => {
  it('should render Booked successfully', async () => {
    render(<TitleImpormation />);
  });
});
