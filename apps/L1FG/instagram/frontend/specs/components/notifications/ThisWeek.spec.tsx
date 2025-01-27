import { ThisWeek } from '@/components/notifications/ThisWeek';
import { render } from '@testing-library/react';
describe('Profile', () => {
  it('Should render', () => {
    render(<ThisWeek />);
  });
});
