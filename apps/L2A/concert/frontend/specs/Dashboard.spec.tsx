import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/app/_components/Dashboard';

describe('Dashboard Component', () => {
  it('renders the Dashboard component', () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByTestId('dashboard');
    expect(dashboardElement).toBeInTheDocument();
  });

  it('renders 8 ticket cards', () => {
    render(<Dashboard />);
    const cards = screen.getAllByText(/Music of the Spheres/i);
    expect(cards).toHaveLength(8);
  });
});
