import { render, screen } from '@testing-library/react';
import { MyProfileForm } from '@/components/MyProfileForm';
import '@testing-library/jest-dom';

const mockOnSubmit = jest.fn();

describe('MyProfileForm', () => {
  it('renders without crashing', () => {
    render(<MyProfileForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Personal Information'));
    expect(screen.getByText('This is how others will see you on the site.'));
    expect(screen.getByLabelText('Name'));
    expect(screen.getByLabelText('Email'));
    expect(screen.getByLabelText('Date of birth'));
    expect(screen.getByLabelText('Gender Preference'));
    expect(screen.getByLabelText('Bio'));
    expect(screen.getByLabelText('Interests'));
    expect(screen.getByLabelText('School/Work'));
    expect(screen.getByLabelText('Profession'));
    expect(screen.getByText('Update Profile'));
  });
});
