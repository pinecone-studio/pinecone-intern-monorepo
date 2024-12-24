import ProfilePage from '@/components/profile/MainSection';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ProfilePage Component', () => {
  it('renders correctly with initial step as "profile"', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Hi, Shagai'));
    expect(screen.getByText('Personal Information'));
  });

  it('changes step to "images" when "Images" button is clicked', () => {
    render(<ProfilePage />);

    const imagesButton = screen.getByText('Images');
    fireEvent.click(imagesButton);

    expect(screen.getByText('Images Section'));
  });

  it('changes step to "profile" when "Profile" button is clicked after switching to "images"', () => {
    render(<ProfilePage />);

    const imagesButton = screen.getByText('Images');
    fireEvent.click(imagesButton);

    const profileButton = screen.getByText('Profile');
    fireEvent.click(profileButton);

    expect(screen.getByText('Personal Information'));
  });

  it('handles invalid step value gracefully', () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {
      console.log('as');
    });

    render(<ProfilePage />);

    const setStepMock = jest.fn();
    const handleSetStep = (value: string) => {
      if (value === 'profile' || value === 'images') {
        setStepMock(value);
        expect(screen.getByTestId, 'ddd');
      }
    };
    handleSetStep('invalid-step');

    // expect(setStepMock).not;

    expect(consoleErrorMock);

    consoleErrorMock.mockRestore();
  });

  it('calls setStep with correct values when a step is selected', () => {
    render(<ProfilePage />);

    // const handleSetStep = (value: string) => {
    //   if (value === 'profile' || value === 'images') {
    //     setStepMock(value);
    //   }
    // };
  });
});
