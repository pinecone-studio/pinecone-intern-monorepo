import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavigationBlue } from '@/components/user/main/NavigationBlue';

describe('NavigationBlue', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Mock-уудыг цэвэрлэх
  });

  it('should render successfully when user is logged in', () => {
    // `localStorage`-ийг mock хийх
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('mocked-token');

    render(<NavigationBlue />);

    // "My Booking" товч байгаа эсэхийг шалгах
    expect(screen.getByText('My Booking'));
  });

  it('should render successfully when user is not logged in', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(<NavigationBlue />);

    // "Register" болон "Sign in" товчнууд байгаа эсэхийг шалгах
    expect(screen.getByText('Register'));
    expect(screen.getByText('Sign in'));
  });
});
