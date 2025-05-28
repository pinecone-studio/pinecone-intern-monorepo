import { ProfileHeader } from '@/app/edit-profile/profile/_components/ProfileHeader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ProfileHeader', () => {
  it('renders the correct heading and description', () => {
    render(<ProfileHeader />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('This is how others will see you on the site.')).toBeInTheDocument();
  });
});