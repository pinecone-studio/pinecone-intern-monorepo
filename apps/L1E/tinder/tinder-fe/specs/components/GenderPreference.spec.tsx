import GenderPreference from '@/components/profile/GenderPreference';
import { render, screen } from '@testing-library/react';

describe('GenderPreference', () => {
  it('should render nothing expect text', () => {
    render(<GenderPreference />);
    expect(screen.getByText('Gender Preferences:'));
  });
});
