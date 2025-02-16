import ActivityCard from '@/components/notifications/ActivityCard';
import { render } from '@testing-library/react';

describe('ActivityCard', () => {
  it('Should render', () => {
    render(<ActivityCard />);
  });
});
