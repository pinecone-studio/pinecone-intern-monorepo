import Dashboard from '@/app/_components/Dashbourd';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Dashboard', () => {
  it('should render Dashboard', async () => {
    render(<Dashboard />);

    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toBeInTheDocument();
  });
});
