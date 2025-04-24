import Dashboard from '@/app/_components/Dashbourd';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Dashboard ', () => {
  it('should render Dashbourd', async () => {
    render(<Dashboard />);
  });
});
