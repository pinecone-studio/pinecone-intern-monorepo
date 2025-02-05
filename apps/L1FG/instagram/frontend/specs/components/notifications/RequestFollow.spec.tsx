import { RequestFollow } from '@/components/notifications/RequestFollow';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<RequestFollow />);
  });
});
