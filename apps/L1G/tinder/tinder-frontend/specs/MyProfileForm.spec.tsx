import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MyProfileForm } from '@/components/MyProfileForm';
import '@testing-library/jest-dom';

describe('MyProfileForm', () => {
  it('renders without crashing', () => {
    render(<MyProfileForm />);

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

  it('clicks the update button with filled form', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<MyProfileForm />);

    fireEvent.change(screen.getByLabelText('Bio'), { target: { value: 'Hello, I am John!' } });

    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    fireEvent.click(screen.getByText('Art'));
    fireEvent.click(screen.getByText('Music'));
    fireEvent.click(screen.getByText('Sports'));

    fireEvent.change(screen.getByLabelText('School/Work'), { target: { value: 'Example High School' } });
    fireEvent.change(screen.getByLabelText('Profession'), { target: { value: 'Software Engineer' } });

    fireEvent.click(screen.getByRole('button', { name: /Update Profile/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('working');
    });

    consoleSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
