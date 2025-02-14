import { ContainerProfile } from '@/features/user/profile';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('ContainerProfile', () => {
  it('should render Booked successfully', async () => {
    render(<ContainerProfile />);
  });
});
