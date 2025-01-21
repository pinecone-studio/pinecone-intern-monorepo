import { Today } from '@/components/notifications/Today';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<Today />);
  });
});
