import { render, screen } from '@testing-library/react';
import Match from '@/components/ItsAmAtch';

describe('its a match', () => {
  it('should render without crash', () => {
    render(<Match />);

    expect(screen.getAllByText('Its a Match'));
    expect(screen.getAllByText('You matched with Baatarvan'));
    expect(screen.getAllByPlaceholderText('Say something nice'));
    expect(screen.getByRole('button', { name: /Send/i }));
    expect(screen.getByRole('img', { name: /Close icon/i }));
    expect(screen.getByRole('img', { name: /zurag1/i }));
    expect(screen.getByRole('img', { name: /zurag2/i }));
  });
});
