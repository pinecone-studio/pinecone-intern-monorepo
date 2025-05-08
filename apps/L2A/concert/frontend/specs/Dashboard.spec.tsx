import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/app/_components/Dashboard';
describe('Dashboard Component', () => {
  it('Should renders the Dashboard component', () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByTestId('dashboard');
    expect(dashboardElement).toBeInTheDocument();
  });
});
