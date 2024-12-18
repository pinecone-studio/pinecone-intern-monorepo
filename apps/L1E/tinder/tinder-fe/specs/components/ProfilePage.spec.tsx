import ProfilePage from '@/components/profile/MainSection';
import { render, screen } from '@testing-library/react';

describe('ProfilePage', () => {
  it('should', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Hi, Shagai'));
  });
});
