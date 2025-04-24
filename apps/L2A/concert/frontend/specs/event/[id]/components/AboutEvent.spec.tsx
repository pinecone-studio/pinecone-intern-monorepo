import { render, screen } from '@testing-library/react';
import AboutEvent from '@/app/event/[id]/components/AboutEvent';
import '@testing-library/jest-dom';

describe('AboutEvent', () => {
  it('renders the AboutEvent component without crashing', () => {
    render(<AboutEvent />);
    expect(screen.getByText('2024.11.15 - 11.18')).toBeInTheDocument();
  });

  it('renders the event date and time', () => {
    render(<AboutEvent />);
    expect(screen.getByText('2024.11.15 - 11.18')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });
});
