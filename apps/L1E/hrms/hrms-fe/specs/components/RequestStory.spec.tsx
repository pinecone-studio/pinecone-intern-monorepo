import RequestStory from '@/components/RequestStory';
import { render, screen } from '@testing-library/react';

describe('RequestStory Component', () => {
  it('renders the date and status', () => {
    render(<RequestStory />);
    expect(screen.getByText('10/15'));
  });
});
