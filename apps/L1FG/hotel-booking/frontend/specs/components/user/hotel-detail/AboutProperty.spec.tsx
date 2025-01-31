import { About } from '@/components/user/hotel-detail/About';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('AboutProperty', () => {
  it('should render AboutProperty successfully', async () => {
    render(<About />);
  });
});
