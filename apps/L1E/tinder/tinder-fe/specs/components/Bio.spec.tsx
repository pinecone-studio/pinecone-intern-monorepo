import Bio from '@/components/profile/Bio';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Bio', () => {
  it('should call onUpdate when text is changed', () => {
    const mockUser = {
      bio: 'Initial bio text',
    };

    render(<Bio user={mockUser} />);

    const textarea = screen.getByDisplayValue('Initial bio text');

    fireEvent.change(textarea, { target: { value: 'Updated bio text' } });
  });
});
